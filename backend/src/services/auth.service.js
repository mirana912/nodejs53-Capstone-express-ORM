// src/services/auth.service.js
// ==========================================
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NguoiDung } = require("../models");
const jwtConfig = require("../config/jwt.config");

class AuthService {
  // Đăng ký người dùng mới
  async register(userData) {
    const { email, mat_khau, ho_ten, tuoi } = userData;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await NguoiDung.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email đã được sử dụng");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    // Tạo user mới
    const newUser = await NguoiDung.create({
      email,
      mat_khau: hashedPassword,
      ho_ten,
      tuoi: tuoi || null,
      anh_dai_dien: null,
    });

    // Tạo JWT token
    const token = jwt.sign(
      jwtConfig.generatePayload(newUser),
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    // Trả về user info (không bao gồm password)
    const userResponse = {
      nguoi_dung_id: newUser.nguoi_dung_id,
      email: newUser.email,
      ho_ten: newUser.ho_ten,
      tuoi: newUser.tuoi,
      anh_dai_dien: newUser.anh_dai_dien,
    };

    return { user: userResponse, token };
  }

  // Đăng nhập
  async login(email, mat_khau) {
    // Tìm user theo email
    const user = await NguoiDung.findOne({ where: { email } });
    if (!user) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Kiểm tra password
    const isValidPassword = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isValidPassword) {
      throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Tạo JWT token
    const token = jwt.sign(jwtConfig.generatePayload(user), jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    // Trả về user info (không bao gồm password)
    const userResponse = {
      nguoi_dung_id: user.nguoi_dung_id,
      email: user.email,
      ho_ten: user.ho_ten,
      tuoi: user.tuoi,
      anh_dai_dien: user.anh_dai_dien,
    };

    return { user: userResponse, token };
  }

  // Lấy thông tin user từ token
  async getProfile(nguoi_dung_id) {
    const user = await NguoiDung.findByPk(nguoi_dung_id, {
      attributes: { exclude: ["mat_khau"] },
    });

    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    return user;
  }
}

module.exports = new AuthService();

// ==========================================
