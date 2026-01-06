// src/routes/auth.route.js
// ==========================================
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

// Validation rules
const registerValidation = [
  body("email").isEmail().withMessage("Email không hợp lệ").normalizeEmail(),
  body("mat_khau")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .trim(),
  body("ho_ten")
    .notEmpty()
    .withMessage("Họ tên không được để trống")
    .isLength({ min: 2 })
    .withMessage("Họ tên phải có ít nhất 2 ký tự")
    .trim(),
  body("tuoi")
    .optional()
    .isInt({ min: 1, max: 150 })
    .withMessage("Tuổi phải từ 1 đến 150"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Email không hợp lệ").normalizeEmail(),
  body("mat_khau")
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .trim(),
];

// Routes
/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký tài khoản mới
 * @access  Public
 */
router.post("/register", registerValidation, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập
 * @access  Public
 */
router.post("/login", loginValidation, authController.login);

/**
 * @route   GET /api/auth/profile
 * @desc    Lấy thông tin user hiện tại
 * @access  Private
 */
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;

// ==========================================
