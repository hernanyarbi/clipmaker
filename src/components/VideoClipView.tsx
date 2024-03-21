"use client";
import useVideoClip from "../hooks/useVideoClip";
import React from "react";
import { UploadVideo } from "./UploadVideo";
import ClipCreator from "./ClipCreator";

export const VideoClipView = () => {
  const {
    state: { status },
  } = useVideoClip();
  return status === 0 ? <UploadVideo /> : <ClipCreator />;
};
