// src/components/Image/ImageCard.jsx
// ==========================================
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/helpers";

const ImageCard = ({ image }) => {
  return (
    <Link
      to={`/image/${image.hinh_id}`}
      className="group block relative overflow-hidden rounded-2xl cursor-pointer mb-4 break-inside-avoid"
    >
      <img
        src={getImageUrl(image.duong_dan)}
        alt={image.ten_hinh}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay on hover - chỉ hiện khi hover */}
      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex flex-col justify-between p-4">
        {/* Top buttons - hidden by default */}
        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="px-4 py-2 bg-[#E60023] text-white rounded-full font-semibold hover:bg-[#AD081B] transition text-sm">
            Lưu
          </button>
        </div>

        {/* Bottom info */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {image.mo_ta && (
            <p className="text-white text-sm mb-2 line-clamp-2">
              {image.mo_ta}
            </p>
          )}
          {image.nguoi_tao && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {image.nguoi_tao.ho_ten?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-white text-sm font-medium">
                {image.nguoi_tao.ho_ten}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;

// ==========================================
