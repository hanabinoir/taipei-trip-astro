import { useEffect, useState } from "react";
import "./PhotoGallery.css";

interface PhotoGalleryProps {
  slug: string;
  photos: string[];
  spotName: string;
}

export default function PhotoGallery({ slug, photos, spotName }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Construct full image paths
  const fullPhotoPaths = photos.map((photo) => `/images/spots/${slug}/${photo}`);

  if (photos.length === 0) {
    return (
      <div className="photo-gallery">
        <div className="photo-placeholder" role="img" aria-label={`${spotName}照片待補`}>
          照片待補
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === null ? photos.length - 1 : (prev - 1 + photos.length) % photos.length));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") handleCloseModal();
  };

  return (
    <div className="photo-gallery">
      {/* Thumbnail slides */}
      <div className="photo-slides">
        {fullPhotoPaths.map((photo, index) => (
          <button
            key={index}
            className="photo-thumbnail"
            onClick={() => handleThumbnailClick(index)}
            aria-label={`查看照片 ${index + 1}`}
          >
            <img src={photo} alt={`${spotName}照片 ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* Modal for full image view */}
      {selectedIndex !== null && (
        <div className="photo-modal" onClick={handleCloseModal} onKeyDown={handleKeyDown} role="dialog">
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={handleCloseModal} aria-label="關閉">
              ✕
            </button>

            <button className="photo-modal-nav photo-modal-prev" onClick={handlePrev} aria-label="上一張">
              ‹
            </button>

            <img src={fullPhotoPaths[selectedIndex]} alt={`${spotName}照片 ${selectedIndex + 1}`} />

            <button className="photo-modal-nav photo-modal-next" onClick={handleNext} aria-label="下一張">
              ›
            </button>

            <div className="photo-modal-counter">
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
