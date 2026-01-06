// src/pages/ImageDetail/ImageDetail.jsx
// ==========================================
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { imageAPI } from "../../services/api.service";
import { useAuth } from "../../contexts/AuthContext";
import { getImageUrl, formatDate } from "../../utils/helpers";
import CommentSection from "../../components/Image/CommentSection";

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [image, setImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchImageDetail();
    fetchComments();
    if (user) {
      checkSavedStatus();
    }
  }, [id, user]);

  const fetchImageDetail = async () => {
    try {
      const response = await imageAPI.getById(id);
      setImage(response.data.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("Không thể tải ảnh");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await imageAPI.getComments(id);
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const response = await imageAPI.checkSaved(id);
      setIsSaved(response.data.data.is_saved);
    } catch (error) {
      console.error("Error checking saved status:", error);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    try {
      if (isSaved) {
        await imageAPI.unsave(id);
        setIsSaved(false);
      } else {
        await imageAPI.save(id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      alert("Có lỗi xảy ra");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa ảnh này?")) return;

    try {
      await imageAPI.delete(id);
      alert("Xóa ảnh thành công");
      navigate("/");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Không thể xóa ảnh");
    }
  };

  const handleAddComment = async (content) => {
    await imageAPI.addComment(id, { noi_dung: content });
    await fetchComments();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy ảnh</p>
      </div>
    );
  }

  const isOwner = user?.nguoi_dung_id === image.nguoi_dung_id;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="bg-gray-100 flex items-center justify-center p-8">
              <img
                src={getImageUrl(image.duong_dan)}
                alt={image.ten_hinh}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              {/* Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveToggle}
                    disabled={actionLoading}
                    className={`px-6 py-3 rounded-full font-semibold transition ${
                      isSaved
                        ? "bg-secondary text-white hover:bg-gray-800"
                        : "bg-primary text-white hover:bg-red-700"
                    } disabled:opacity-50`}
                  >
                    {isSaved ? "Đã lưu" : "Lưu"}
                  </button>
                </div>

                {isOwner && (
                  <button
                    onClick={handleDelete}
                    className="p-3 hover:bg-gray-100 rounded-full transition"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-3">{image.ten_hinh}</h1>
                {image.mo_ta && <p className="text-gray-600">{image.mo_ta}</p>}
              </div>

              {/* Creator Info */}
              {image.nguoi_tao && (
                <Link
                  to={`/profile/${image.nguoi_tao.nguoi_dung_id}`}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition mb-6"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-600">
                      {image.nguoi_tao.ho_ten?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{image.nguoi_tao.ho_ten}</p>
                    <p className="text-sm text-gray-500">
                      {image.nguoi_tao.email}
                    </p>
                  </div>
                </Link>
              )}

              {/* Comments */}
              <div className="flex-1 overflow-y-auto">
                <CommentSection
                  comments={comments}
                  onAddComment={handleAddComment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
