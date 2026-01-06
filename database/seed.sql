-- FILE: database/seed.sql
-- ==========================================
USE pinterest_db;

-- Insert sample users (password: 123456)
-- Note: Trong thực tế, password phải được hash bằng bcrypt
INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien) VALUES
('john@example.com', '$2b$10$rQ5Zx5ZqFqFqFqFqFqFqFuGx5xFqFqFqFqFqFqFqFqFqFqFqFq', 'John Doe', 25, 'avatar1.jpg'),
('jane@example.com', '$2b$10$rQ5Zx5ZqFqFqFqFqFqFqFuGx5xFqFqFqFqFqFqFqFqFqFqFqFq', 'Jane Smith', 28, 'avatar2.jpg'),
('alice@example.com', '$2b$10$rQ5Zx5ZqFqFqFqFqFqFqFuGx5xFqFqFqFqFqFqFqFqFqFqFqFq', 'Alice Johnson', 30, 'avatar3.jpg');

-- Insert sample images
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id) VALUES
('Beautiful Sunset', '/uploads/sunset.jpg', 'Amazing sunset view from the beach', 1),
('Mountain Peak', '/uploads/mountain.jpg', 'Climbing to the top of the mountain', 1),
('City Lights', '/uploads/city.jpg', 'Night view of the city skyline', 2),
('Ocean Wave', '/uploads/ocean.jpg', 'Powerful ocean waves', 3),
('Forest Path', '/uploads/forest.jpg', 'Walking through the forest', 2);

-- Insert sample comments
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung) VALUES
(2, 1, '2024-01-15', 'Absolutely stunning! Where is this?'),
(3, 1, '2024-01-15', 'Beautiful colors!'),
(1, 3, '2024-01-16', 'Love the city lights!'),
(3, 2, '2024-01-16', 'What an adventure!'),
(2, 4, '2024-01-17', 'The power of nature!');

-- Insert sample saved images
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu) VALUES
(1, 3, '2024-01-15'),
(1, 4, '2024-01-16'),
(2, 1, '2024-01-15'),
(2, 2, '2024-01-16'),
(3, 1, '2024-01-15'),
(3, 5, '2024-01-17');

-- Kiểm tra dữ liệu
SELECT 'Users:' as Table_Name, COUNT(*) as Count FROM nguoi_dung
UNION ALL
SELECT 'Images:', COUNT(*) FROM hinh_anh
UNION ALL
SELECT 'Comments:', COUNT(*) FROM binh_luan
UNION ALL
SELECT 'Saved Images:', COUNT(*) FROM luu_anh;