// src/routes/user.route.js
// ==========================================
const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

// Validation rules
const updateUserValidation = [
  body("ho_ten")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Họ tên phải có ít nhất 2 ký tự")
    .trim(),
  body("tuoi")
    .optional()
    .isInt({ min: 1, max: 150 })
    .withMessage("Tuổi phải từ 1 đến 150"),
  body("mat_khau_moi")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Mật khẩu mới phải có ít nhất 6 ký tự"),
];

// Routes
router.get("/:id", userController.getUserById);
router.get("/:id/saved-images", userController.getSavedImages);
router.get("/:id/created-images", userController.getCreatedImages);
router.put(
  "/:id",
  authMiddleware,
  updateUserValidation,
  userController.updateUser
);

module.exports = router;
