package app.vercel.benjaminpuricelli.tech_challenge.controller;

import app.vercel.benjaminpuricelli.tech_challenge.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/books/images")
public class ImageController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @DeleteMapping("/destroyImage")
    public ResponseEntity<?> deleteImage(@RequestBody Map<String, String> request) {
        String imageUrl = request.get("imageUrl");
        System.out.println(imageUrl);
        if (imageUrl == null || imageUrl.isEmpty()) {
            return ResponseEntity.badRequest().body("imageUrl is required");
        }
        try {
            String message = cloudinaryService.destroyImage(imageUrl);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting image: " + e.getMessage());
        }
    }
}
