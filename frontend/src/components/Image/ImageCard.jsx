// src/components/Image/ImageCard.jsx
// ==========================================
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/helpers";

const ImageCard = ({ image }) => {
  return (
    <Link
      to={`/image/${image.hinh_id}`}
      className="group block relative overflow-hidden rounded-2xl cursor-zoom-in"
    >
      <img
        src={getImageUrl(image.duong_dan)}
        alt={image.ten_hinh}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">
            {image.ten_hinh}
          </h3>
          {image.nguoi_tao && (
            <p className="text-sm opacity-90">{image.nguoi_tao.ho_ten}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;

// ==========================================
