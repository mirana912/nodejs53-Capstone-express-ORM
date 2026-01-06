// src/pages/Profile/Profile.jsx
// ==========================================
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { userAPI } from "../../services/api.service";
import { useAuth } from "../../contexts/AuthContext";
import MasonryGrid from "../../components/Image/MasonryGrid";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("created");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.nguoi_dung_id === parseInt(id);

  useEffect(() => {
    fetchUser();
    fetchImages();
  }, [id, activeTab]);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getById(id);
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response =
        activeTab === "created"
          ? await userAPI.getCreatedImages(id)
          : await userAPI.getSavedImages(id);

      // Transform saved images to match image structure
      const transformedImages =
        activeTab === "saved"
          ? response.data.data.map((item) => item.hinh_anh)
          : response.data.data;

      setImages(transformedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          {user.anh_dai_dien ? (
            <img
              src={user.anh_dai_dien}
              alt={user.ho_ten}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-gray-600">
              {user.ho_ten?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-2">{user.ho_ten}</h1>
        <p className="text-gray-600 mb-1">{user.email}</p>
        {user.tuoi && <p className="text-gray-500 text-sm">{user.tuoi} tuổi</p>}

        {isOwnProfile && (
          <div className="mt-6">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-red-700 transition"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tạo Pin mới
            </Link>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setActiveTab("created")}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === "created"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Đã tạo
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === "saved"
                  ? "text-black border-b-2 border-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Đã lưu
            </button>
          </div>
        </div>
      </div>

      {/* Images Grid */}
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              {activeTab === "created"
                ? "Chưa có Pin nào được tạo"
                : "Chưa có Pin nào được lưu"}
            </p>
            {isOwnProfile && activeTab === "created" && (
              <Link
                to="/upload"
                className="inline-block px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-red-700 transition"
              >
                Tạo Pin đầu tiên
              </Link>
            )}
          </div>
        ) : (
          <MasonryGrid images={images} />
        )}
      </div>
    </div>
  );
};

export default Profile;
