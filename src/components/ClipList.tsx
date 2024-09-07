import useVideoClip from "@/hooks/useVideoClip";
import React, { useEffect } from "react";
import { formatTime } from "@/utils/helper";
import { useFFmpeg } from "@/hooks/useFFmpeg";
import { DownloadButton } from "./icons/DownloadButton";

const ClipList = () => {
  const {load, loaded, transcode} = useFFmpeg()
  const { state, downloadTxtFile, jumpToTime } = useVideoClip();
  const { clips } = state;


  const download = (clip: any) => {
    transcode(clip.start, clip.end, clip.name);
  };

  useEffect(()=>{
    load()
  },[])


  return (
    <div className="overflow-y-auto  flex flex-col gap-2 p-2">
      {clips.map((clip, index) => (
        <div
          key={index}
          // onClick={() => onClipSelection(clip.start)}
          className="flex items-center justify-between gap-2 p-3 rounded-md bg-gray-900 "
        >
          <div className="flex gap-2">
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => jumpToTime(clip.start)}
            >
              {formatTime(clip.start)} - {formatTime(clip.end)}
            </span>
            <span className="text-gray-300 font-popins">{clip.name}</span>
          </div>
          {loaded && <button className="rounded-lg bg-gray-800 px-1">
            <DownloadButton width={24} onClick={() => download(clip)} />
          </button>}
        </div>
      ))}
      <button
        className="rounded-lg bg-gray-800 px-1"
        onClick={() => downloadTxtFile()}
      >
        Download Text List Clips
      </button>
    </div>
  );
};

export default ClipList;
