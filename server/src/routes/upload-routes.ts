import { UPLOAD_PATHS } from "../enums/route.enum";
import { uploadFile } from "../controllers/upload/upload-controller";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({
  dest: "./uploaded-files",
});

router.post(UPLOAD_PATHS.UPLOAD_FILE, upload.single("file"), uploadFile);

export default router;
