import { useVideoContext } from "@/contexts/VideoClipContext";
import { formatTime } from "@/utils/helper";

const useVideoClip = () => {
  const { state, dispatch } = useVideoContext();
  const { video: videoFile, clips } = state;

  const uploadVideo = (file: File) => {
    dispatch({ type: "SET_VIDEO", payload: file });
  };

  const createClip = (name: string, start: number, end: number) => {
    console.log(name);

    dispatch({ type: "ADD_CLIP", payload: { name, start, end } });
  };

  const jumpToTime = (time: number) => {
    dispatch({ type: "JUMP_TIME", payload: { jumpTime: time } });
  };

  const downloadClip = async (start: number, end: number, clipName: string) => {
    if (videoFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const halfArrayBuffer = arrayBuffer.slice(start, end);

        const halfBlob = new Blob([halfArrayBuffer], { type: videoFile.type });
        const url = URL.createObjectURL(halfBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `half_${videoFile.name}`;
        link.click();
        URL.revokeObjectURL(url);
      };
      fileReader.onerror = (error) => {
        console.error("Error al leer el archivo:", error);
      };

      fileReader.readAsArrayBuffer(videoFile);
    }
  };

  function formatClip(clip: any): string {
    const startTime = formatTime(clip.start);
    const endTime = formatTime(clip.end);
    return `|${startTime} - ${endTime}| ${clip.name}`;
  }

  const downloadTxtFile = () => {
    const formattedClips = clips.map(formatClip).join("\n");
    const element = document.createElement("a");
    const file = new Blob([formattedClips], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "clips.txt";
    document.body.appendChild(element);
    element.click();
  };

  return {
    state,
    uploadVideo,
    createClip,
    downloadClip,
    downloadTxtFile,
    jumpToTime,
  };
};

export default useVideoClip;
