// src/controllers/image.controller.js
// ===================================

const imageService = require("../services/image.service.js");
const ResponseUtil = require("../utils/response.util.js");
const { validationResult } = require("express-validator");

class ImageController {
  // Lấy danh sách ảnh
  async getAllImages(req, res, next) {
    try {
      const image = await imageService.getAllImages();
      return ResponseUtil.success(res, images, "Lấy danh sách ảnh thành công");
    } catch (error) {
      next(error);
    }
  }

  // GET /api/images/search?name=keyword - Tìm kiếm ảnh
  async searchImages(req, res, next) {
    try {
      const { name } = req.query;

      if (!name || name.trim() === "") {
        return ResponseUtil.error(res, "Vui lòng nhập từ khóa tìm kiếm", 400);
      }

      const images = await imageService.searchImages(name.trim());
      return ResponseUtil.success(
        res,
        images,
        `Tìm thấy ${images.length} kết quả`
      );
    } catch (error) {
      next(error);
    }
  }

  // GET /api/images/:id - Lấy thông tin chi tiết ảnh
  async getImageById(req, res, next) {
    try {
      const { id } = req.params;
      const image = await imageService.getImageById(id);
      return ResponseUtil.success(res, image, "Lấy thông tin ảnh thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // GET /api/images/:id/comments - Lấy bình luận theo ảnh
  async getCommentsByImageId(req, res, next) {
    try {
      const { id } = req.params;
      const comments = await imageService.getCommentsByImageId(id);
      return ResponseUtil.success(
        res,
        comments,
        "Lấy danh sách bình luận thành công"
      );
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // GET /api/images/:id/saved - Kiểm tra ảnh đã lưu chưa
  async checkImageSaved(req, res, next) {
    try {
      const { id } = req.params;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      const result = await imageService.checkImageSaved(id, nguoi_dung_id);
      return ResponseUtil.success(res, result, "Kiểm tra thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // POST /api/images/:id/comments - Thêm bình luận
  async addComment(req, res, next) {
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
      const { noi_dung } = req.body;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      const comment = await imageService.addComment(
        id,
        nguoi_dung_id,
        noi_dung
      );
      return ResponseUtil.created(res, comment, "Thêm bình luận thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      next(error);
    }
  }

  // POST /api/images/:id/save - Lưu ảnh
  async saveImage(req, res, next) {
    try {
      const { id } = req.params;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      const result = await imageService.saveImage(id, nguoi_dung_id);
      return ResponseUtil.created(res, result, "Lưu ảnh thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      if (error.message === "Bạn đã lưu ảnh này rồi") {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  }

  // DELETE /api/images/:id/save - Bỏ lưu ảnh
  async unsaveImage(req, res, next) {
    try {
      const { id } = req.params;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      await imageService.unsaveImage(id, nguoi_dung_id);
      return ResponseUtil.noContent(res, "Bỏ lưu ảnh thành công");
    } catch (error) {
      if (error.message === "Bạn chưa lưu ảnh này") {
        return ResponseUtil.error(res, error.message, 400);
      }
      next(error);
    }
  }

  // POST /api/images - Upload ảnh mới
  async uploadImage(req, res, next) {
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

      if (!req.file) {
        return ResponseUtil.error(res, "Vui lòng chọn file ảnh", 400);
      }

      const { ten_hinh, mo_ta } = req.body;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      const image = await imageService.createImage(
        { ten_hinh, mo_ta, nguoi_dung_id },
        req.file
      );

      return ResponseUtil.created(res, image, "Upload ảnh thành công");
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/images/:id - Xóa ảnh
  async deleteImage(req, res, next) {
    try {
      const { id } = req.params;
      const nguoi_dung_id = req.user.nguoi_dung_id;

      await imageService.deleteImage(id, nguoi_dung_id);
      return ResponseUtil.noContent(res, "Xóa ảnh thành công");
    } catch (error) {
      if (error.message === "Không tìm thấy hình ảnh") {
        return ResponseUtil.notFound(res, error.message);
      }
      if (error.message === "Bạn không có quyền xóa ảnh này") {
        return ResponseUtil.forbidden(res, error.message);
      }
      next(error);
    }
  }
}

module.exports = new ImageController();

// ==========================================
