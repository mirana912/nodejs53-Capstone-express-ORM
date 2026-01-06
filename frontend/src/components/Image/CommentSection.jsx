// FILE: src/components/Image/CommentSection.jsx
// ==========================================
import { useState } from "react";
import { formatDate } from "../../utils/helpers";
import { useAuth } from "../../contexts/AuthContext";

const CommentSection = ({ comments, onAddComment }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || loading) return;

    setLoading(true);
    try {
      await onAddComment(newComment);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Không thể thêm bình luận");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Bình luận</h3>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm bình luận..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || loading}
            className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Đang gửi..." : "Gửi"}
          </button>
        </form>
      ) : (
        <p className="text-gray-500 text-sm">Đăng nhập để bình luận</p>
      )}

      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">Chưa có bình luận nào</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.binh_luan_id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-gray-600">
                  {comment.nguoi_binh_luan?.ho_ten?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {comment.nguoi_binh_luan?.ho_ten}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.ngay_binh_luan)}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.noi_dung}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;

// ==========================================
