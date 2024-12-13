// src/services/organizer/testUploadSupabaseService/testUploadSupabaseService.js
import { supabase } from "../../../config/supabaseConfig";
/**
 * Uploads an image to Supabase Storage and returns a signed URL.
 *
 * @param {string} uri - The local URI of the image to upload.
 * @param {string} fileName - The desired file name in Supabase Storage.
 * @returns {Promise<string>} - A promise that resolves to the signed URL of the uploaded image.
 */
export const testUploadImageToSupabase = async (uri, fileName) => {
  try {
    // Fetch the image as a binary buffer
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Failed to fetch the image.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Define the storage path
    const storagePath = `test_uploads/${fileName}`;

    // Upload the Uint8Array to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("capstone") // Ensure this bucket exists and is private
      .upload(storagePath, uint8Array, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/jpeg",
      });

    if (uploadError) {
      throw uploadError;
    }

    // console.log("Image uploaded successfully to Supabase.");

    // Generate signed URLs (v2.x requires an array of paths)
    const { data: signedURLData, error: signedURLError } =
      await supabase.storage
        .from("capstone")
        .createSignedUrls([storagePath], 3600); // URL valid for 1 hour

    if (signedURLError) {
      throw signedURLError;
    }

    // Ensure that signedURLData is not undefined and contains the signed URL
    if (!signedURLData || !signedURLData[0] || !signedURLData[0].signedURL) {
      throw new Error("Signed URL was not generated.");
    }

    const signedURL = signedURLData[0].signedURL;
    // console.log("Signed URL obtained:", signedURL);

    return signedURL;
  } catch (error) {
    console.error("Error uploading image to Supabase:", error);
    if (error instanceof TypeError) {
      console.error("Possible network issue or invalid URI.");
    } else {
      console.error("Error details:", error.message || error);
    }
    throw error;
  }
};
