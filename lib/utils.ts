import { Mail } from "@prisma/client";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date): string {
  if (!input) return "loading...";
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toDateString();
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
}

export const handleUpload = async (image: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", image); // Image file or base64 string
    formData.append("upload_preset", "bh3lmi8g");

    // Send the image to Cloudinary
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/docf0sevm/image/upload",
      formData
    );

    const downloadURL = response.data.secure_url;

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Upload failed");
  }
};
