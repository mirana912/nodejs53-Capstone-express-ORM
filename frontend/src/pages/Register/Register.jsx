// Fsrc/pages/Register/Register.jsx
// ==========================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { isValidEmail } from "../../utils/helpers";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    mat_khau: "",
    ho_ten: "",
    tuoi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(formData.email)) {
      setError("Email không hợp lệ");
      return;
    }

    if (formData.mat_khau.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (formData.ho_ten.length < 2) {
      setError("Họ tên phải có ít nhất 2 ký tự");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        tuoi: formData.tuoi ? parseInt(formData.tuoi) : undefined,
      };

      await register(dataToSend);
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-3xl font-semibold mb-2">Welcome to my picture</h1>
          <p className="text-gray-600">Tìm những ý tưởng mới để thử</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              name="mat_khau"
              value={formData.mat_khau}
              onChange={handleChange}
              required
              placeholder="Tạo mật khẩu"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ tên
            </label>
            <input
              type="text"
              name="ho_ten"
              value={formData.ho_ten}
              onChange={handleChange}
              required
              placeholder="Họ tên"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tuổi
            </label>
            <input
              type="number"
              name="tuoi"
              value={formData.tuoi}
              onChange={handleChange}
              min="1"
              max="150"
              placeholder="Tuổi"
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E60023] text-white rounded-full font-semibold hover:bg-[#AD081B] disabled:opacity-50 disabled:cursor-not-allowed transition text-lg mt-6"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-[#E60023] font-semibold hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// ==========================================
