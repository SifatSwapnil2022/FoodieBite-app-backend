import { MulterFile } from "multer";

declare namespace Express {
  export interface Request {
    file?: MulterFile; // Single file
    files?: MulterFile[]; // Multiple files
    user?: {
      id: string;
      email: string;
    }; // Add custom properties
  }
}
