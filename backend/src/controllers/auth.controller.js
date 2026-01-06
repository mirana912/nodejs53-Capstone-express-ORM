// src/controllers/auth.controller.js
// ==========================================
const authService = require("../services/auth.service");
const ResponseUtil = require("../utils/response.util");
const { validationResult } = require("express-validator");

class AuthController {
  // POST /api/auth/register
  async register(req, res, next) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseUtil.error(
          res,
          "Dữ liệu không hợp lệ",
          400,
          errors.array()
        );
      }

      const { email, mat_khau, ho_ten, tuoi } = req.body;

      // Call service
      const result = await authService.register({
        email,
        mat_khau,
        ho_ten,
        tuoi,
      });

      return ResponseUtil.created(res, result, "Đăng ký thành công");
    } catch (error) {
      // Nếu là lỗi email đã tồn tại
      if (error.message === "Email đã được sử dụng") {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  }

  // POST /api/auth/login
  async login(req, res, next) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseUtil.error(
          res,
          "Dữ liệu không hợp lệ",
          400,
          errors.array()
        );
      }

      const { email, mat_khau } = req.body;

      // Call service
      const result = await authService.login(email, mat_khau);

      return ResponseUtil.success(res, result, "Đăng nhập thành công");
    } catch (error) {
      // Nếu là lỗi đăng nhập sai
      if (error.message === "Email hoặc mật khẩu không đúng") {
        return ResponseUtil.error(res, error.message, 401);
      }
      next(error);
    }
  }

  // GET /api/auth/profile
  async getProfile(req, res, next) {
    try {
      // Lấy user id từ token (đã được verify trong middleware)
      const nguoi_dung_id = req.user.nguoi_dung_id;

      const user = await authService.getProfile(nguoi_dung_id);

      return ResponseUtil.success(res, user, "Lấy thông tin thành công");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

// ==========================================
