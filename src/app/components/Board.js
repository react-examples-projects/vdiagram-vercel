"use client";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  SelectionMode,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { Button } from "@geist-ui/core";
import { memo } from "react";
import { FiDownload } from "react-icons/fi";
import { TbFileExport } from "react-icons/tb";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { downloadFile } from "../helpers/utils";
import cls from "classnames";
import useConfig from "../hooks/useConfig";
import useFlowViewport from "../hooks/useFlowViewport";
import useFlowJSON from "../hooks/useFlowJSON";
const panOnDrag = [1, 2];
const imageWidth = 1024;
const imageHeight = 768;

function Board({
  nodes,
  edges,
  onEdgesChange,
  onConnect,
  onNodesChange,
  onReconnectEnd,
  onReconnect,
  onReconnectStart,
}) {
  const viewport = useFlowViewport();
  const { exportDiagramJSON } = useFlowJSON();
  const { background, theme, imageFormat, backgroundGap, imageBackground } = useConfig();
  const { getNodes } = useReactFlow();

  const downloadImageEvent = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0, 2);
    const $imageBackground =
      imageBackground === "current" ? (theme === "dark" ? "#000" : "#fff") : imageBackground;

    const config = {
      filter: (node) =>
        !(
          node?.classList?.contains("react-flow__minimap") ||
          node?.classList?.contains("react-flow__controls")
        ),
      backgroundColor: $imageBackground,
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    };
    const cb = {
      png: toPng,
      jpeg: toJpeg,
      svg: toSvg,
    };

    const viewportElement = document.querySelector(".react-flow__viewport");
    cb[imageFormat](viewportElement, config).then((dataUrl) =>
      downloadFile({ dataUrl, fileType: imageFormat })
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        colorMode={theme}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onConnect={onConnect}
        fitView
        selectionOnDrag
        snapToGrid
        panOnDrag={panOnDrag}
        selectionMode={SelectionMode.Partial}
        className="download-image"
        viewport={viewport}
      >
        <Background variant={background} gap={backgroundGap} />
        <Controls style={{ bottom: "4.8rem" }} />
        <MiniMap
          className={cls({ dark: theme === "dark", light: theme === "light" })}
          position="top-left"
          maskColor={theme === "dark" ? "#0C0C0C" : "#fff"}
          nodeColor={theme === "dark" ? "#eee" : "#525252"}
        />
        <div className="controls">
          <Button
            title="Download as image"
            aria-label="Download as image"
            type="abort"
            onClick={downloadImageEvent}
            iconRight={<FiDownload color={theme === "dark" ? "#fff" : "#000"} />}
            scale={2.5}
            auto
          />

          <Button
            title="Export as JSON"
            aria-label="Export as JSON"
            type="abort"
            onClick={exportDiagramJSON}
            iconRight={<TbFileExport color={theme === "dark" ? "#fff" : "#000"} />}
            scale={2.5}
            auto
          />
        </div>
      </ReactFlow>
    </div>
  );
}
export default memo(Board);
