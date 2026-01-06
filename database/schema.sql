-- FILE: database/schema.sql
// ==========================================
-- Tạo database
CREATE DATABASE IF NOT EXISTS pinterest_db;
USE pinterest_db;

-- Xóa các bảng nếu tồn tại (theo thứ tự FK)
DROP TABLE IF EXISTS luu_anh;
DROP TABLE IF EXISTS binh_luan;
DROP TABLE IF EXISTS hinh_anh;
DROP TABLE IF EXISTS nguoi_dung;

-- Bảng nguoi_dung
CREATE TABLE nguoi_dung (
    nguoi_dung_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    mat_khau VARCHAR(255) NOT NULL,
    ho_ten VARCHAR(255) NOT NULL,
    tuoi INT,
    anh_dai_dien VARCHAR(500),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng hinh_anh
CREATE TABLE hinh_anh (
    hinh_id INT PRIMARY KEY AUTO_INCREMENT,
    ten_hinh VARCHAR(255) NOT NULL,
    duong_dan VARCHAR(500) NOT NULL,
    mo_ta TEXT,
    nguoi_dung_id INT NOT NULL,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    INDEX idx_nguoi_dung (nguoi_dung_id),
    INDEX idx_ten_hinh (ten_hinh)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng binh_luan
CREATE TABLE binh_luan (
    binh_luan_id INT PRIMARY KEY AUTO_INCREMENT,
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_binh_luan DATE NOT NULL,
    noi_dung TEXT NOT NULL,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE,
    INDEX idx_hinh_id (hinh_id),
    INDEX idx_nguoi_dung (nguoi_dung_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bảng luu_anh (composite primary key)
CREATE TABLE luu_anh (
    nguoi_dung_id INT NOT NULL,
    hinh_id INT NOT NULL,
    ngay_luu DATE NOT NULL,
    PRIMARY KEY (nguoi_dung_id, hinh_id),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE CASCADE,
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id) ON DELETE CASCADE,
    INDEX idx_nguoi_dung (nguoi_dung_id),
    INDEX idx_hinh_id (hinh_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================