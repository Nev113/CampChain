import axios from "axios";

// Using ImgBB as a free image hosting service
const IMGBB_API_KEY =
  process.env.NEXT_PUBLIC_IMGBB_API_KEY || "f33e7e5611c18b449c6bb06aef312f99";
const DEFAULT_IMAGE = "/example-image.png"; // Fallback to a local image in case of upload failure

export async function uploadImage(file: File): Promise<string> {
  if (!IMGBB_API_KEY || IMGBB_API_KEY === "YOUR_IMGBB_API_KEY") {
    console.warn(
      "ImgBB API key not configured correctly. Using default image."
    );
    return DEFAULT_IMAGE;
  }

  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", IMGBB_API_KEY);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data && response.data.success) {
      return response.data.data.url;
    } else {
      console.error("Image upload unsuccessful:", response.data);
      throw new Error(
        "Failed to upload image: " +
          (response.data?.error?.message || "Unknown error")
      );
    }
  } catch (error: any) {
    console.error("Error uploading image:", error.message || error);

    // For development only - in production we would want to notify the user
    if (process.env.NODE_ENV !== "production") {
      return DEFAULT_IMAGE;
    }

    throw error;
  }
}
