// src/models/binh_luan.model.js
// ==========================================
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.config");

const BinhLuan = sequelize.define(
  "binh_luan",
  {
    binh_luan_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "binh_luan_id",
    },
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nguoi_dung",
        key: "nguoi_dung_id",
      },
    },
    hinh_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hinh_anh",
        key: "hinh_id",
      },
    },
    ngay_binh_luan: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "binh_luan",
    timestamps: false,
  }
);

module.exports = BinhLuan;

// ==========================================
