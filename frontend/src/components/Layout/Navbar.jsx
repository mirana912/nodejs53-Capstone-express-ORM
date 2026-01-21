// src/components/Layout/Navbar.jsx
// ==========================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Logo - Hidden on mobile */}
          <Link to="/" className="hidden sm:block">
            <div className="w-12 h-12 bg-[#E60023] rounded-full flex items-center justify-center hover:bg-[#AD081B] transition">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 01.083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12z" />
              </svg>
            </div>
          </Link>

          {/* Trang chủ button */}
          <Link
            to="/"
            className="px-4 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Trang chủ
          </Link>

          {/* Tạo button - Only show when logged in */}
          {user && (
            <Link
              to="/upload"
              className="hidden md:block px-4 py-3 hover:bg-gray-100 rounded-full font-semibold transition"
            >
              Tạo
            </Link>
          )}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-12 py-3 bg-gray-100 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Notifications */}
                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition relative">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-2 right-2 w-5 h-5 bg-[#E60023] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    3
                  </span>
                </button>

                {/* Messages */}
                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-full transition">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>

                {/* User Avatar */}
                <Link
                  to={`/profile/${user.nguoi_dung_id}`}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold hover:bg-gray-300 transition overflow-hidden"
                >
                  {user.anh_dai_dien ? (
                    <img
                      src={user.anh_dai_dien}
                      alt={user.ho_ten}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600">
                      {user.ho_ten?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </Link>

                {/* Dropdown Menu */}
                <button
                  onClick={handleLogout}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-gray-100 rounded-full font-semibold transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 bg-[#E60023] text-white rounded-full font-semibold hover:bg-[#AD081B] transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// ==========================================
