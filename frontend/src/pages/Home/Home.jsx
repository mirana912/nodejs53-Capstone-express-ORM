// src/pages/Home/Home.jsx
// ==========================================
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { imageAPI } from "../../services/api.service";
import MasonryGrid from "../../components/Image/MasonryGrid";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, [searchQuery]);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = searchQuery
        ? await imageAPI.search(searchQuery)
        : await imageAPI.getAll();

      setImages(response.data.data);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError("Không thể tải ảnh. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#E60023]"></div>
          <p className="text-gray-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-480 mx-auto px-4 py-6">
        {searchQuery && (
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">
              Kết quả cho "{searchQuery}"
            </h1>
            <p className="text-gray-600 mt-1">{images.length} kết quả</p>
          </div>
        )}

        <MasonryGrid images={images} />
      </div>
    </div>
  );
};

export default Home;

// ==========================================
