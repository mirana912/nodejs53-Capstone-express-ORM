// src/controllers/user.controller.js
// ==========================================
const userService = require("../services/user.service");
const ResponseUtil = require("../utils/response.util");
const { validationResult } = require("express-validator");

class UserController {
  // GET /api/users/:id - Lấy thông tin user
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return ResponseUtil.success(
        res,
        user,
        "Lấy thông tin người dùng thành công"
      );
    } catch (error) {
      if (error.message === "Không tìm thấy người dùng") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // GET /api/users/:id/saved-images - Lấy ảnh đã lưu
  async getSavedImages(req, res, next) {
    try {
      const { id } = req.params;
      const images = await userService.getSavedImages(id);
      return ResponseUtil.success(
        res,
        images,
        "Lấy danh sách ảnh đã lưu thành công"
      );
    } catch (error) {
      if (error.message === "Không tìm thấy người dùng") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // GET /api/users/:id/created-images - Lấy ảnh đã tạo
  async getCreatedImages(req, res, next) {
    try {
      const { id } = req.params;
      const images = await userService.getCreatedImages(id);
      return ResponseUtil.success(
        res,
        images,
        "Lấy danh sách ảnh đã tạo thành công"
      );
    } catch (error) {
      if (error.message === "Không tìm thấy người dùng") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // PUT /api/users/:id - Cập nhật thông tin user
  async updateUser(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseUtil.error(
          res,
          "Dữ liệu không hợp lệ",
          400,
          errors.array()
        );
      }

      const { id } = req.params;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      // Kiểm tra quyền: chỉ được update chính mình
      if (parseInt(id) !== nguoi_dung_id) {
        return ResponseUtil.forbidden(
          res,
          "Bạn không có quyền cập nhật thông tin người dùng khác"
        );
      }

      const user = await userService.updateUser(id, req.body);
      return ResponseUtil.success(res, user, "Cập nhật thông tin thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy người dùng") {
        return ResponseUtil.notFound(res, error.message);
      }
      if (
        error.message === "Vui lòng nhập mật khẩu cũ" ||
        error.message === "Mật khẩu cũ không đúng"
      ) {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  }
}

module.exports = new UserController();

// ==========================================
