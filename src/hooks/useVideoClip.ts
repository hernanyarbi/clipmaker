import { useVideoContext } from "@/contexts/VideoClipContext";

const useVideoClip = () => {
  const { state, dispatch } = useVideoContext();

  const uploadVideo = (file: File) => {
    dispatch({ type: "SET_VIDEO", payload: file });
  };

  const createClip = (name: string, start: number, end: number) => {
    console.log(name);

    dispatch({ type: "ADD_CLIP", payload: { name, start, end } });
  };

  const saveClip = () => {
    // Lógica para guardar el clip
  };

  const downloadClip = () => {
    // Lógica para descargar el clip
  };

  return { state, uploadVideo, createClip, saveClip, downloadClip };
};

export default useVideoClip;
