"use client";

import { getLocalStorage } from "../helpers/utils";
import { useOnViewportChange } from "@xyflow/react";
import { useState, useRef } from "react";

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };
const $defaultViewport = getLocalStorage("viewport");
const RENDER_COUNT_DIAGRAM = 2;

export default function useFlowViewport() {
  const [viewport, setViewport] = useState($defaultViewport ?? defaultViewport);
  const renderCount = useRef(0);

  useOnViewportChange({
    onStart(newViewport) {
      setViewport(newViewport);
      window.localStorage.setItem("viewport", JSON.stringify(newViewport));
    },
    onChange: (newViewport) => {
      renderCount.current++;
      if (renderCount.current <= RENDER_COUNT_DIAGRAM) {
        return;
      }

      setViewport(newViewport);
      window.localStorage.setItem("viewport", JSON.stringify(newViewport));
    },
  });

  return viewport;
}
