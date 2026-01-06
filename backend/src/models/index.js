// Fsrc/models/index.js
// ==========================================
const NguoiDung = require("./nguoi_dung.model");
const HinhAnh = require("./hinh_anh.model");
const BinhLuan = require("./binh_luan.model");
const LuuAnh = require("./luu_anh.model");

// ==========================================
// ĐỊNH NGHĨA RELATIONSHIPS (ASSOCIATIONS)
// ==========================================

// 1. NguoiDung - HinhAnh (1-N)
// Một người dùng có thể tạo nhiều hình ảnh
NguoiDung.hasMany(HinhAnh, {
  foreignKey: "nguoi_dung_id",
  as: "hinh_anh_da_tao",
});

HinhAnh.belongsTo(NguoiDung, {
  foreignKey: "nguoi_dung_id",
  as: "nguoi_tao",
});

// 2. HinhAnh - BinhLuan (1-N)
// Một hình ảnh có thể có nhiều bình luận
HinhAnh.hasMany(BinhLuan, {
  foreignKey: "hinh_id",
  as: "binh_luan",
});

BinhLuan.belongsTo(HinhAnh, {
  foreignKey: "hinh_id",
  as: "hinh_anh",
});

// 3. NguoiDung - BinhLuan (1-N)
// Một người dùng có thể có nhiều bình luận
NguoiDung.hasMany(BinhLuan, {
  foreignKey: "nguoi_dung_id",
  as: "binh_luan",
});

BinhLuan.belongsTo(NguoiDung, {
  foreignKey: "nguoi_dung_id",
  as: "nguoi_binh_luan",
});

// 4. NguoiDung - LuuAnh - HinhAnh (N-N through LuuAnh)
// Một người dùng có thể lưu nhiều hình ảnh
// Một hình ảnh có thể được nhiều người dùng lưu
NguoiDung.belongsToMany(HinhAnh, {
  through: LuuAnh,
  foreignKey: "nguoi_dung_id",
  otherKey: "hinh_id",
  as: "hinh_anh_da_luu",
});

HinhAnh.belongsToMany(NguoiDung, {
  through: LuuAnh,
  foreignKey: "hinh_id",
  otherKey: "nguoi_dung_id",
  as: "nguoi_luu",
});

// Định nghĩa relationship trực tiếp với LuuAnh
NguoiDung.hasMany(LuuAnh, {
  foreignKey: "nguoi_dung_id",
  as: "luu_anh",
});

HinhAnh.hasMany(LuuAnh, {
  foreignKey: "hinh_id",
  as: "luu_anh",
});

LuuAnh.belongsTo(NguoiDung, {
  foreignKey: "nguoi_dung_id",
  as: "nguoi_dung",
});

LuuAnh.belongsTo(HinhAnh, {
  foreignKey: "hinh_id",
  as: "hinh_anh",
});

// ==========================================
// EXPORT ALL MODELS
// ==========================================
module.exports = {
  NguoiDung,
  HinhAnh,
  BinhLuan,
  LuuAnh,
};

// ==========================================
