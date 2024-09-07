import { useVideoContext } from "@/contexts/VideoClipContext";
import { formatTime } from "@/utils/helper";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";

export const useFFmpeg = () => {
  const { state } = useVideoContext();
  const { video: videoFile } = state;
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  // const messageRef = useRef(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
        // if (messageRef.current) messageRef.current.innerHTML = message
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  const transcode = async (start: number, end: number, clipName: string) => {
    if (videoFile) {
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile(videoFile.name, await fetchFile(videoFile));
      await ffmpeg.exec([
        "-i",
        videoFile.name,
        "-ss",
        formatTime(start), // Tiempo de inicio
        "-to",
        formatTime(end), // Tiempo de finalización
        "-c",
        "copy",
        `${clipName}.mp4`
      ]);
      const data: any = await ffmpeg.readFile( `${clipName}.mp4`);
      const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      const link = document.createElement("a");
      link.href = url;
      link.download =  `${clipName}.mp4`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };
  return {load, transcode, loaded};
};
