// src/routes/image.route.js
// ==========================================
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { body } = require("express-validator");

// Validation rules
const commentValidation = [
  body("noi_dung")
    .notEmpty()
    .withMessage("Nội dung không được để trống")
    .trim(),
];

const uploadValidation = [
  body("ten_hinh")
    .notEmpty()
    .withMessage("Tên hình không được để trống")
    .trim(),
  body("mo_ta").optional().trim(),
];

// Public routes - không cần token
router.get("/", imageController.getAllImages);
router.get("/search", imageController.searchImages);
router.get("/:id", imageController.getImageById);
router.get("/:id/comments", imageController.getCommentsByImageId);

// Protected routes - cần token
router.get("/:id/saved", authMiddleware, imageController.checkImageSaved);
router.post(
  "/:id/comments",
  authMiddleware,
  commentValidation,
  imageController.addComment
);
router.post("/:id/save", authMiddleware, imageController.saveImage);
router.delete("/:id/save", authMiddleware, imageController.unsaveImage);
router.post(
  "/",
  authMiddleware,
  upload.single("hinh_anh"),
  uploadValidation,
  imageController.uploadImage
);
router.delete("/:id", authMiddleware, imageController.deleteImage);

module.exports = router;

// ==========================================
