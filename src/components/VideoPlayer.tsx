import { useVideoContext } from "@/contexts/VideoClipContext";
import React, { useRef, useEffect, useState } from "react";
import VideoPlayerControls from "./VideoPlayerControls";
import { formatTime } from "@/utils/helper";
import useVideoClip from "@/hooks/useVideoClip";

export const VideoPlayer: React.FC = () => {
  const { state } = useVideoClip();
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const jumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play(); // Reproducir el video desde el nuevo tiempo
    }
  };

  useEffect(() => {
    if (state.video) {
      videoRef.current?.play();
    }
  }, [state.video]);

  useEffect(() => {
    jumpToTime(state.jumpTime);
  }, [state.jumpTime]);

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
