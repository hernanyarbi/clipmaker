import React, { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import ClipList from "./ClipList";
import ClipCreator from "./ClipCreator";

const ClipVideos: React.FC = () => {
  const [clips, setClips] = useState<
    { name: string; start: number; end: number }[]
  >([]);

  const handleClipCreation = (name: string, start: number, end: number) => {
    setClips((prevClips) => [...prevClips, { name, start, end }]);
  };

  const handleClipSelection = (time: number) => {
    // Función para mover el tiempo del reproductor
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4">
        <VideoPlayer />
      </div>
      <div className="w-full lg:w-1/4">
        <ClipList clips={clips} onClipSelection={handleClipSelection} />
        <ClipCreator onCreateClip={handleClipCreation} />
      </div>
    </div>
  );
};

export default ClipVideos;
