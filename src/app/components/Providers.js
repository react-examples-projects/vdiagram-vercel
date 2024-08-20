"use client";
import { Toaster } from "sonner";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { ReactFlowProvider } from "@xyflow/react";
import { SkeletonTheme } from "react-loading-skeleton";

import useConfig from "../hooks/useConfig";

export default function Providers({ children }) {
  const { theme } = useConfig();
  const baseColor = theme === "dark" ? "#202020" : "#ebebeb";
  const highlightColor = theme === "dark" ? "#444" : "#D0D0D0";

  return (
    <GeistProvider themeType={theme}>
      <CssBaseline />
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </SkeletonTheme>

      <Toaster
        position="top-right"
        visibleToasts={4}
        theme={theme}
        expand={true}
        richColors
        closeButton
      />
    </GeistProvider>
  );
}
