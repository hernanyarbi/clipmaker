import useVideoClip from "@/hooks/useVideoClip";
import React from "react";
import { DownloadButton } from "./icons/DownloadButton";

const ClipList = () => {
  const { state } = useVideoClip();
  const { clips } = state;
  return (
    <div className="overflow-y-auto max-h-64 flex flex-col gap-2 p-2">
      {clips.map((clip, index) => (
        <div
          key={index}
          // onClick={() => onClipSelection(clip.start)}
          className="flex items-center justify-between gap-2 p-3 rounded-md bg-gray-900 "
        >
          <div className="flex gap-2">
            <span className="text-blue-700">{formatTime(clip.start)}</span>
            <span className="text-gray-300 font-popins">{clip.name}</span>
          </div>
          <button className="rounded-lg bg-gray-800 px-1">
            <DownloadButton width={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default ClipList;
