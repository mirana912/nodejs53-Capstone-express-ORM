// src/components/Image/MasonryGrid.jsx
// ==========================================
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const MasonryGrid = ({ images }) => {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 768) setColumns(3);
      else if (window.innerWidth < 1024) setColumns(4);
      else if (window.innerWidth < 1280) setColumns(5);
      else setColumns(6);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const getColumnImages = (columnIndex) => {
    return images.filter((_, index) => index % columns === columnIndex);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Không tìm thấy ảnh nào</p>
      </div>
    );
  }

  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {getColumnImages(columnIndex).map((image) => (
            <ImageCard key={image.hinh_id} image={image} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

// ==========================================
