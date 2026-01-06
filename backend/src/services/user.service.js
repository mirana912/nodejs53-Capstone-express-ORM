// src/services/user.service.js
// ==========================================
const { NguoiDung, HinhAnh, LuuAnh } = require("../models");
const bcrypt = require("bcrypt");

class UserService {
  // Lấy thông tin user
  async getUserById(nguoi_dung_id) {
    const user = await NguoiDung.findByPk(nguoi_dung_id, {
      attributes: { exclude: ["mat_khau"] },
    });

    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    return user;
  }

  // Lấy danh sách ảnh đã lưu của user
  async getSavedImages(nguoi_dung_id) {
    const user = await NguoiDung.findByPk(nguoi_dung_id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const savedImages = await LuuAnh.findAll({
      where: { nguoi_dung_id },
      include: [
        {
          model: HinhAnh,
          as: "hinh_anh",
          include: [
            {
              model: NguoiDung,
              as: "nguoi_tao",
              attributes: ["nguoi_dung_id", "ho_ten", "anh_dai_dien"],
            },
          ],
        },
      ],
      order: [["ngay_luu", "DESC"]],
    });

    return savedImages;
  }

  // Lấy danh sách ảnh đã tạo của user
  async getCreatedImages(nguoi_dung_id) {
    const user = await NguoiDung.findByPk(nguoi_dung_id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const images = await HinhAnh.findAll({
      where: { nguoi_dung_id },
      order: [["hinh_id", "DESC"]],
    });

    return images;
  }

  // Cập nhật thông tin user
  async updateUser(nguoi_dung_id, updateData) {
    const user = await NguoiDung.findByPk(nguoi_dung_id);
    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const { ho_ten, tuoi, anh_dai_dien, mat_khau_cu, mat_khau_moi } =
      updateData;

    // Đổi mật khẩu
    if (mat_khau_moi) {
      if (!mat_khau_cu) {
        throw new Error("Vui lòng nhập mật khẩu cũ");
      }

      const isValidPassword = await bcrypt.compare(mat_khau_cu, user.mat_khau);
      if (!isValidPassword) {
        throw new Error("Mật khẩu cũ không đúng");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(mat_khau_moi, salt);
      user.mat_khau = hashedPassword;
    }

    // Cập nhật các thông tin khác
    if (ho_ten) user.ho_ten = ho_ten;
    if (tuoi !== undefined) user.tuoi = tuoi;
    if (anh_dai_dien !== undefined) user.anh_dai_dien = anh_dai_dien;

    await user.save();

    // Trả về user không có password
    const userResponse = await NguoiDung.findByPk(nguoi_dung_id, {
      attributes: { exclude: ["mat_khau"] },
    });

    return userResponse;
  }
}

module.exports = new UserService();

// ==========================================
