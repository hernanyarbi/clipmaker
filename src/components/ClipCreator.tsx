// components/ClipCreator.tsx
import React, { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import ClipList from "./ClipList";

const ClipCreator = () => {
  return (
    <div className="grid grid-cols-3">
      <VideoPlayer />

      <ClipList />
    </div>
  );
};

export default ClipCreator;
