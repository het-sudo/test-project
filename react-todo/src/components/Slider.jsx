import { useState, useEffect, useCallback } from "react";
import "../App.css";

function Slider() {
  const [images, setImages] = useState([
    { id: 1, url: "https://picsum.photos/id/1015/800/600", folder: "All" },
    { id: 2, url: "https://picsum.photos/id/1016/800/600", folder: "All" },
    { id: 3, url: "https://picsum.photos/id/1025/800/600", folder: "All" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentFolder, setCurrentFolder] = useState("All");


  const filteredImages =
    currentFolder === "All"
      ? images
      : images.filter((img) => img.folder === currentFolder);

 

  const closeImage = () => setCurrentIndex(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);



  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, nextImage, prevImage]);

  const addImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImage = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      folder: "All",
    };

    setImages((prev) => [...prev, newImage]);
    e.target.value=""

  };

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    closeImage();
  };


  const moveToFolder = (id, folder) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, folder } : img
      )
    );
    closeImage();
  };

  return (
    <div className="app">
      <h1>React Gallery</h1>


      <input type="file" onChange={addImage} />
      
     
      <div className="folders">
        {["All", "Favorites", "Travel"].map((folder) => (
          <button
            key={folder}
            className={currentFolder === folder ? "active" : ""}
            onClick={() => setCurrentFolder(folder)}
          >
            {folder}
          </button>
        ))}
      </div>


      <div className="gallery">
        {filteredImages.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            alt=""
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {currentIndex !== null && (
        <div className="modal">
          <span className="close" onClick={closeImage}>✕</span>
          <span className="prev" onClick={prevImage}>❮</span>

          <img src={filteredImages[currentIndex].url} alt="" />

          <div className="modal-actions">
            <button
              onClick={() =>
                deleteImage(filteredImages[currentIndex].id)
              }
            >
              Delete
            </button>

            <button
              onClick={() =>
                moveToFolder(
                  filteredImages[currentIndex].id,
                  "Favorites"
                )
              }
            >
              Move to Favorites
            </button>
          </div>

          <span className="next" onClick={nextImage}>❯</span>
        </div>
      )}
    </div>
  );
}

export default Slider;