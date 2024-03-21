import { useVideoContext } from "@/contexts/VideoClipContext";
import React, { useRef, useEffect, useState } from "react";
import VideoPlayerControls from "./VideoPlayerControls";

export const VideoPlayer: React.FC = () => {
  const { state } = useVideoContext();
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (state.video) {
      videoRef.current?.play();
    }
  }, [state.video]);

  return (
    <div className="relative col-span-2">
      {state.video && (
        <video
          ref={videoRef}
          controls={false}
          className="max-h-screen w-full bg-gray-900"
          onTimeUpdate={updateTime}
        >
          <source
            src={URL.createObjectURL(state.video)}
            type={state.video.type}
          />
        </video>
      )}
      <VideoPlayerControls
        videoRef={videoRef}
        currentTime={formatTime(currentTime)}
      />
    </div>
  );
};
