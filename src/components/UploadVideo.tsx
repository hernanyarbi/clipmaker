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
    <div className="flex justify-center items-center p-10 w-full">
      <div className="bg-gray-900 py-8 px-7 rounded-xl w-full max-w-screen-md flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Listado de clips</h1>
        <h2 className="text-xl font-semibold">Crea el listado de tus clips</h2>
      <div
        className={`before:content-['Arrastra_y_suelta_un_video_aquí'] border-2 border-dashed rounded-lg  bg-opacity-45 text-center w-full p-8 h-60 flex justify-center items-center  ${
          dragging ? "border-blue-400 bg-blue-700" : "border-blue-800 bg-blue-950 "
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
      </div>
      </div>
    </div>  
  );
};
