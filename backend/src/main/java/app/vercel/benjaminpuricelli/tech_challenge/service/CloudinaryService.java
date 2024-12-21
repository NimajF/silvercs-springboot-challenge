package app.vercel.benjaminpuricelli.tech_challenge.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CloudinaryService {
    @Autowired
    private Cloudinary cloudinary;

    public String destroyImage(String imageUrl) throws Exception {

        String[] urlParts = imageUrl.split("/");
        String lastPart = urlParts[urlParts.length - 2] + "/" + urlParts[urlParts.length - 1];
        String publicId = lastPart.substring(0, lastPart.lastIndexOf("."));
        System.out.println("Extracted public_id: " + publicId);

        Map<String, Object> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

        if ("ok".equals(result.get("result"))) {
            return "Image deleted successfully";
        } else {
            throw new Exception("Failed to delete image: " + result.get("result"));
        }
    }
}
