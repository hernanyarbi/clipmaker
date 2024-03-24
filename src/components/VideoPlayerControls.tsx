import React, { useState } from "react";
import { PlayIcon } from "./icons/PlayIcon";
import { PauseIcon } from "./icons/PauseIcon";
import { BackVideo } from "./icons/BackVideo";
import { AdvanceVideo } from "./icons/AdvanceVideo";
import { CutIcon } from "./icons/CutIcon";
import ClipPopup from "./ClipPopup";
import useVideoClip from "@/hooks/useVideoClip";

const VideoPlayerControls = ({
  videoRef,
  currentTime,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  currentTime: string;
}) => {
  const { createClip } = useVideoClip();
  const [isPaying, setIsPaying] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const [clipData, setClipData] = useState<any>({
    name: "",
    start: null,
  });

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaying(true);
      } else {
        videoRef.current.pause();
        setIsPaying(false);
      }
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleClipVideo = async () => {
    if (videoRef.current) {
      if (clipData.start === null) {
        await setClipData({ start: videoRef.current.currentTime });
      } else {
        videoRef.current.pause();
        setShowPopup(true);
      }
    }
  };

  const handleSaveName = (name: string) => {
    if (videoRef.current) {
      createClip(name, clipData.start, videoRef.current.currentTime);
      setClipData({
        name: "",
        start: null,
      });
      setShowPopup(false);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-3 p-4 bg-black bg-opacity-50 w-full max-h-[40rem]">
      <button onClick={handlePlayPause}>
        {isPaying ? <PauseIcon width={24} /> : <PlayIcon width={24} />}
      </button>
      <button
        onClick={handleSkipBackward}
        className="flex items-center gap-1 text-[12px]"
      >
        -10s
        <BackVideo width={24} />
      </button>
      <span className={`${clipData.start !== null ? "text-blue-700" : ""}`}>
        {currentTime}
      </span>
      <button
        onClick={handleSkipForward}
        className=" flex items-center gap-1 text-[12px]"
      >
        <AdvanceVideo width={24} />
        +10s
      </button>
      <button onClick={handleClipVideo}>
        <CutIcon
          width={24}
          className={clipData.start !== null ? "fill-blue-700" : ""}
        />
      </button>
      {showPopup && (
        <ClipPopup
          onSave={handleSaveName}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default VideoPlayerControls;
