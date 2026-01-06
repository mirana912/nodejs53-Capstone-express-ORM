// src/models/luu_anh.model.js
// ==========================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.config");

const LuuAnh = sequelize.define(
  "luu_anh",
  {
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "nguoi_dung",
        key: "nguoi_dung_id",
      },
    },
    hinh_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "hinh_anh",
        key: "hinh_id",
      },
    },
    ngay_luu: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "luu_anh",
    timestamps: false,
  }
);

module.exports = LuuAnh;

// ==========================================
