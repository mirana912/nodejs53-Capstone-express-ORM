// src/pages/Upload/Upload.jsx
// ==========================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { imageAPI } from "../../services/api.service";
import { useAuth } from "../../contexts/AuthContext";

const Upload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    ten_hinh: "",
    mo_ta: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Vui lòng chọn file ảnh");
      return;
    }

    // Validate file size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Kích thước file không được vượt quá 5MB");
      return;
    }

    setFile(selectedFile);
    setError("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Vui lòng chọn ảnh");
      return;
    }

    if (!formData.ten_hinh.trim()) {
      setError("Vui lòng nhập tên ảnh");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("hinh_anh", file);
      data.append("ten_hinh", formData.ten_hinh);
      data.append("mo_ta", formData.mo_ta);

      const response = await imageAPI.upload(data);
      alert("Upload ảnh thành công!");
      navigate(`/image/${response.data.data.hinh_id}`);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.message || "Upload thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Tạo Pin mới</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn ảnh <span className="text-red-500">*</span>
                </label>

                <div
                  onClick={() => document.getElementById("file-input").click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition"
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-96 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Click để chọn ảnh</p>
                        <p className="text-sm text-gray-400">
                          hoặc kéo thả ảnh vào đây
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="mt-2 text-sm text-red-500 hover:underline"
                  >
                    Chọn ảnh khác
                  </button>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="ten_hinh"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tiêu đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="ten_hinh"
                    name="ten_hinh"
                    value={formData.ten_hinh}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Thêm tiêu đề"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mo_ta"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="mo_ta"
                    name="mo_ta"
                    value={formData.mo_ta}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Thêm mô tả chi tiết về Pin của bạn"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Lưu ý:</strong> Đảm bảo ảnh của bạn tuân thủ nguyên
                    tắc cộng đồng của chúng tôi.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-full font-semibold transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || !file}
                className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Đang tải lên..." : "Xuất bản"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;

// ==========================================
