"use client";
import React, { createContext, useReducer, useContext } from "react";

interface Clip {
  name: string;
  start: number;
  end: number;
}

interface State {
  video: File | null;
  clips: Clip[];
  status: number;
}

type Action =
  | { type: "SET_VIDEO"; payload: File }
  | { type: "ADD_CLIP"; payload: Clip }
  | { type: "CLEAR_CLIPS" };

const initialState: State = {
  video: null,
  clips: [],
  status: 0,
};

const VideoContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const videoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_VIDEO":
      return { ...state, video: action.payload, status: 1 };
    case "ADD_CLIP":
      return { ...state, clips: [...state.clips, action.payload] };
    case "CLEAR_CLIPS":
      return { ...state, clips: [] };
    default:
      return state;
  }
};

export const VideoProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);
  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
