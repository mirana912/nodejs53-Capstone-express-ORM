// src/components/Image/MasonryGrid.jsx
// ==========================================
import ImageCard from "./ImageCard";

const MasonryGrid = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Không tìm thấy ảnh nào</p>
      </div>
    );
  }

  return (
    <div
      className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4"
      style={{ columnFill: "balance" }}
    >
      {images.map((image) => (
        <ImageCard key={image.hinh_id} image={image} />
      ))}
    </div>
  );
};

export default MasonryGrid;

// ==========================================
