import * as cloudinary from "cloudinary";

declare module "cloudinary" {
  namespace v2 {
    interface UploadApiOptions {
      folder?: string; // Add your custom properties if needed
      use_filename?: boolean;
    }

    interface UploadApiResponse {
      secure_url: string; // Ensure required properties are included
      public_id: string;
    }

    interface UploadApiErrorResponse {
      message: string; // Ensure required properties are included
    }
  }
}
