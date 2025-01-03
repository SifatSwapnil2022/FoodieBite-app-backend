import "express";

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
      files?: Multer.File[]; // If you're handling multiple file uploads
    }
  }
}
