"use client";

import { create } from "zustand";
import { useEffect } from "react";

const defaultConfig = {
  theme: "light",
  background: "dots",
  imageFormat: "png",
  backgroundGap: 30,
  imageBackground: "current",
};

const useStore = create(() => defaultConfig);

export default function useConfig() {
  const { theme, background, imageFormat, backgroundGap, imageBackground } = useStore();
  const saveConfig = () => {
    console.log("Saving config...");
    localStorage.setItem("config", JSON.stringify(useStore.getState()));
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
    theme,
    background,
    imageFormat,
    backgroundGap,
    imageBackground,
    setImageBackground,
    setBackgroundGap,
    setImageFormat,
    setTheme,
    setBackground,
  };
}
