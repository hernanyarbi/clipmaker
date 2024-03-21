import useVideoClip from "../hooks/useVideoClip";
import React, { useState } from "react";

export const UploadVideo = () => {
  const [dragging, setDragging] = useState(false);
  const { uploadVideo } = useVideoClip();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    uploadVideo(file);
  };

  return (
    <div className="flex justify-center p-10">
      <div
        className={`border-2 border-dashed border-blue-800 rounded-lg bg-blue-950 bg-opacity-45 text-center w-full sm:max-w-72 md:max-w-96 p-8  ${
          dragging ? "border-blue-400" : ""
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Arrastra y suelta un video aquí</p>
      </div>
    </div>
  );
};
