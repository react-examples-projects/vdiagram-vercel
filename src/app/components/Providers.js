"use client";
import { Toaster } from "sonner";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { ReactFlowProvider } from "@xyflow/react";
import useConfig from "../hooks/useConfig";

export default function Providers({ children }) {
  const { theme } = useConfig();
  
  return (
    <>
      <GeistProvider themeType={theme}>
        <CssBaseline />
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </GeistProvider>

      <Toaster
        position="top-right"
        visibleToasts={4}
        theme={theme}
        expand={true}
        richColors
        closeButton
      />
    </>
  );
}
