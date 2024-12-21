import axios from "axios";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "silvercustomsoftware");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Error: No se pudo obtener la URL de la imagen.");
    }
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen a Cloudinary.");
  }
}

export async function destroyImage(imageUrl: string) {
  try {
    console.log("Destruyendo imagen:", imageUrl);

    const response = await axios.delete(
      "http://localhost:8081/books/images/destroyImage",
      {
        data: { imageUrl },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error al eliminar la imagen:", error);

    return {
      success: false,
      message: error.response?.data || "Failed to delete image",
    };
  }
}
