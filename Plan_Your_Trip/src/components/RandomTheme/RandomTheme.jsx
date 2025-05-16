import React, { useState, useEffect } from "react";

const RandomTheme = () => {
  const images = [
    "/imagenes/matterhorn.jpg",
    "/imagenes/playasiciliana.jpg",
    "/imagenes/whiteheavenbeach.jpg",
    "/imagenes/tajmahal.jpg",
  ];

  const [bgImage, setBgImage] = useState("");

  const handleImageChange = () => {
    const index = Math.floor(Math.random() * images.length);
    setBgImage(images[index]);
  };

  useEffect(() => {
    if (bgImage) {
      document.body.style.backgroundImage = `url(${bgImage})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    }

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [bgImage]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}
    >
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "rgba(51,51,51,0.7)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleImageChange}
      >
        RANDOM THEME
      </button>
    </div>
  );
};

export default RandomTheme;
