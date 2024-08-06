"use client";

import { create } from "zustand";
import { useEffect } from "react";

const defaultConfig = {
  theme: "light",
  background: "dots",
  imageFormat: "png",
  backgroundGap: 30,
  imageBackground: "current",
  openAiApiKey: null  ,
};

const useStore = create(() => defaultConfig);

export default function useConfig() {
  const context = useStore();
  const saveConfig = () => {
    console.log("Saving config...");
    localStorage.setItem("config", JSON.stringify(useStore.getState()));
  };

  const setOpenAiApiKey = (openAiApiKey) => {
    useStore.setState({ openAiApiKey });
    saveConfig();
  };

  const setImageBackground = (imageBackground) => {
    useStore.setState({ imageBackground });
    saveConfig();
  };

  const setBackgroundGap = (backgroundGap) => {
    useStore.setState({ backgroundGap });
    saveConfig();
  };

  const setImageFormat = (imageFormat) => {
    useStore.setState({ imageFormat });
    saveConfig();
  };

  const setTheme = (theme) => {
    useStore.setState({ theme });
    saveConfig();
  };

  const setBackground = (background) => {
    useStore.setState({ background });
    saveConfig();
  };

  useEffect(() => {
    const currentConfig = JSON.parse(window.localStorage.getItem("config"));
    if (currentConfig) {
      useStore.setState(currentConfig);
    }
  }, []);

  return {
    ...context,
    setImageBackground,
    setBackgroundGap,
    setImageFormat,
    setTheme,
    setBackground,
    setOpenAiApiKey,
  };
}
