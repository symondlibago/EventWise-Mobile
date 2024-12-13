// src/services/organizer/uploadSupabaseService.js

import { supabase } from "../../config/supabaseConfig";

/**
 * Converts a local file URI to a Blob using XMLHttpRequest.
 * @param {string} uri - The file URI.
 * @returns {Promise<Blob>} - A promise that resolves to a Blob.
 */
const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    console.log("Converting URI to Blob:", uri);
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      console.log("Blob conversion successful.");
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      console.error("Blob conversion failed.");
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

/**
 * Uploads an image to Supabase Storage.
 * @param {string} fileUri - The local file URI.
 * @param {string} fileName - The desired file name in Supabase Storage.
 * @returns {Promise<string>} - A promise that resolves to the signed URL of the uploaded image.
 */
const uploadImageToSupabase = async (fileUri, fileName) => {
  try {
    console.log("Starting upload process...");
    console.log("File URI:", fileUri);
    console.log("File Name:", fileName);

    // Convert URI to Blob
    const blob = await uriToBlob(fileUri);
    console.log("Blob created:", blob);

    // Upload Blob to Supabase Storage
    console.log("Uploading Blob to Supabase Storage...");
    const { data, error } = await supabase.storage
      .from("cover_photos") // Ensure this matches your bucket name
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false, // Set to true to overwrite existing files with the same name
      });

    if (error) {
      console.error("Upload error:", error);
      throw error;
    }

    console.log("Upload successful:", data);

    // Generate Signed URL for the uploaded file
    console.log("Generating signed URL...");
    const { data: signedData, error: signedUrlError } = await supabase.storage
      .from("cover_photos")
      .createSignedUrl(data.path, 60); // URL valid for 60 seconds

    if (signedUrlError) {
      console.error("Signed URL error:", signedUrlError);
      throw signedUrlError;
    }

    const signedURL = signedData.signedURL;
    console.log("Signed URL created:", signedURL);

    return signedURL;
  } catch (error) {
    console.error("Supabase Upload Error:", error);
    throw error;
  }
};

export { uploadImageToSupabase };
