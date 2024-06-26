import { UPLOAD_PATHS } from "../enums/route.enum";
import { uploadFile } from "../controllers/upload/upload-controller";
import express from "express";

const router = express.Router();

router.post(UPLOAD_PATHS.UPLOAD_FILE, uploadFile);

export default router;
