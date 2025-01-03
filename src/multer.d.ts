import { File as MulterFile } from "multer";

declare namespace Express {
  export interface Request {
    file?: MulterFile; // Single file upload
    files?: MulterFile[]; // Multiple file uploads
  }
}

declare module "multer" {
  interface MulterFile {
    filename: string; // Customize the file properties as needed
    mimetype: string;
    size: number;
    path: string;
  }
}
