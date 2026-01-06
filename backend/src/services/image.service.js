// src/services/image.service.js
// ==========================================
const { HinhAnh, NguoiDung, BinhLuan, LuuAnh } = require("../models");
const { Op } = require("sequelize");

class ImageService {
  // Lấy danh sách tất cả ảnh
  async getAllImages() {
    const images = await HinhAnh.findAll({
      include: [
        {
          model: NguoiDung,
          as: "nguoi_tao",
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["hinh_id", "DESC"]],
    });

    return images;
  }

  // Tìm kiếm ảnh theo tên
  async searchImages(keyword) {
    const images = await HinhAnh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${keyword}%`,
        },
      },
      include: [
        {
          model: NguoiDung,
          as: "nguoi_tao",
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["hinh_id", "DESC"]],
    });

    return images;
  }

  // Lấy thông tin chi tiết ảnh
  async getImageById(hinh_id) {
    const image = await HinhAnh.findByPk(hinh_id, {
      include: [
        {
          model: NguoiDung,
          as: "nguoi_tao",
          attributes: [
            "nguoi_dung_id",
            "ho_ten",
            "email",
            "tuoi",
            "anh_dai_dien",
          ],
        },
      ],
    });

    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    return image;
  }

  // Lấy danh sách bình luận theo ảnh
  async getCommentsByImageId(hinh_id) {
    // Kiểm tra ảnh có tồn tại không
    const image = await HinhAnh.findByPk(hinh_id);
    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    const comments = await BinhLuan.findAll({
      where: { hinh_id },
      include: [
        {
          model: NguoiDung,
          as: "nguoi_binh_luan",
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
      order: [["ngay_binh_luan", "DESC"]],
    });

    return comments;
  }

  // Kiểm tra ảnh đã được lưu chưa
  async checkImageSaved(hinh_id, nguoi_dung_id) {
    // Kiểm tra ảnh có tồn tại không
    const image = await HinhAnh.findByPk(hinh_id);
    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    const saved = await LuuAnh.findOne({
      where: {
        hinh_id,
        nguoi_dung_id,
      },
    });

    return {
      is_saved: saved !== null,
    };
  }

  // Thêm bình luận
  async addComment(hinh_id, nguoi_dung_id, noi_dung) {
    // Kiểm tra ảnh có tồn tại không
    const image = await HinhAnh.findByPk(hinh_id);
    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    const comment = await BinhLuan.create({
      hinh_id,
      nguoi_dung_id,
      noi_dung,
      ngay_binh_luan: new Date(),
    });

    // Lấy thông tin comment với user
    const commentWithUser = await BinhLuan.findByPk(comment.binh_luan_id, {
      include: [
        {
          model: NguoiDung,
          as: "nguoi_binh_luan",
          attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
        },
      ],
    });

    return commentWithUser;
  }

  // Lưu ảnh
  async saveImage(hinh_id, nguoi_dung_id) {
    // Kiểm tra ảnh có tồn tại không
    const image = await HinhAnh.findByPk(hinh_id);
    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    // Kiểm tra đã lưu chưa
    const existing = await LuuAnh.findOne({
      where: { hinh_id, nguoi_dung_id },
    });

    if (existing) {
      throw new Error("Bạn đã lưu ảnh này rồi");
    }

    const saved = await LuuAnh.create({
      hinh_id,
      nguoi_dung_id,
      ngay_luu: new Date(),
    });

    return saved;
  }

  // Bỏ lưu ảnh
  async unsaveImage(hinh_id, nguoi_dung_id) {
    const deleted = await LuuAnh.destroy({
      where: { hinh_id, nguoi_dung_id },
    });

    if (deleted === 0) {
      throw new Error("Bạn chưa lưu ảnh này");
    }

    return true;
  }

  // Tạo ảnh mới
  async createImage(imageData, file) {
    const { ten_hinh, mo_ta, nguoi_dung_id } = imageData;

    const image = await HinhAnh.create({
      ten_hinh,
      duong_dan: file.path.replace(/\\/g, "/"), // Fix Windows path
      mo_ta,
      nguoi_dung_id,
    });

    return image;
  }

  // Xóa ảnh
  async deleteImage(hinh_id, nguoi_dung_id) {
    const image = await HinhAnh.findByPk(hinh_id);

    if (!image) {
      throw new Error("Không tìm thấy hình ảnh");
    }

    // Kiểm tra quyền sở hữu
    if (image.nguoi_dung_id !== nguoi_dung_id) {
      throw new Error("Bạn không có quyền xóa ảnh này");
    }

    await image.destroy();

    return true;
  }
}

module.exports = new ImageService();

// ==========================================
