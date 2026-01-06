// src/models/hinh_anh.model.js
// ==========================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.config");

const HinhAnh = sequelize.define(
  "hinh_anh",
  {
    hinh_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "hinh_id",
    },
    ten_hinh: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duong_dan: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nguoi_dung",
        key: "nguoi_dung_id",
      },
    },
  },
  {
    tableName: "hinh_anh",
    timestamps: false,
  }
);

module.exports = HinhAnh;

// ==========================================
