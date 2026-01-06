// src/models/nguoi_dung.model.js
// ==========================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.config");

const NguoiDung = sequelize.define(
  "nguoi_dung",
  {
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "nguoi_dung_id",
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email không hợp lệ",
        },
      },
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ho_ten: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: {
          args: [1],
          msg: "Tuổi phải lớn hơn 0",
        },
        max: {
          args: [150],
          msg: "Tuổi không hợp lệ",
        },
      },
    },
    anh_dai_dien: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "nguoi_dung",
    timestamps: false, // Không tự động tạo createdAt, updatedAt
  }
);

module.exports = NguoiDung;

// ==========================================
