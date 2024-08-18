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
import { Button, Tooltip } from "@geist-ui/core";
import { GrDocumentDownload } from "react-icons/gr";
import { GrDocumentImage } from "react-icons/gr";
import { BsFiletypeJson } from "react-icons/bs";
import { toPng, toJpeg, toSvg } from "html-to-image";
import { downloadFile } from "../helpers/utils";
import cls from "classnames";
import useConfig from "../hooks/useConfig";
import useFlowViewport from "../hooks/useFlowViewport";
import useFlowJSON from "../hooks/useFlowJSON";
import CustomNode from "./CustomNode";
import SettingsButton from "./SettingsButton";
import CodeButton from "./CodeButton";
import { memo } from "react";

const panOnDrag = [1, 2];
const imageWidth = 1024;
const imageHeight = 768;
const nodeTypes = {
  customNode: CustomNode,
};

function Board({
  nodes,
  edges,
  onEdgesChange,
  onConnect,
  onNodesChange,
  onReconnectEnd,
  onReconnect,
  onReconnectStart,
  importJSONDiagram,
  toggleOpenCode,
  toggleOpenSettings,
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
        nodeTypes={nodeTypes}
        fitView={false}
        proOptions={{ hideAttribution: true }}
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
          <Tooltip
            text="Settings"
            width="180px"
            style={{ textAlign: "center" }}
            placement="leftStart"
            leaveDelay={0}
            hideArrow
          >
            <SettingsButton toggleOpen={toggleOpenSettings} />
          </Tooltip>

          <Tooltip
            text="Download as image"
            width="180px"
            style={{ textAlign: "center" }}
            placement="leftStart"
            leaveDelay={0}
            hideArrow
          >
            <Button
              title="Download as image"
              aria-label="Download as image"
              type="abort"
              onClick={downloadImageEvent}
              iconRight={<GrDocumentImage color={theme === "dark" ? "#fff" : "#000"} />}
              scale={2.5}
              auto
            />
          </Tooltip>
          <Tooltip
            text="Export as JSON"
            width="180px"
            style={{ textAlign: "center" }}
            placement="leftStart"
            leaveDelay={0}
            hideArrow
          >
            <Button
              title="Export as JSON"
              aria-label="Export as JSON"
              type="abort"
              onClick={exportDiagramJSON}
              iconRight={<GrDocumentDownload color={theme === "dark" ? "#fff" : "#000"} />}
              scale={2.5}
              auto
            />
          </Tooltip>

          <Tooltip
            text="Import JSON"
            width="180px"
            style={{ textAlign: "center" }}
            placement="leftStart"
            leaveDelay={0}
            hideArrow
          >
            <Button
              title="Import JSON"
              aria-label="Import JSON"
              type="abort"
              onClick={importJSONDiagram}
              iconRight={<BsFiletypeJson color={theme === "dark" ? "#fff" : "#000"} />}
              scale={2.8}
              auto
            />
          </Tooltip>
          <Tooltip
            text="See json code"
            width="180px"
            style={{ textAlign: "center" }}
            placement="leftStart"
            leaveDelay={0}
            hideArrow
          >
            <CodeButton toggleOpen={toggleOpenCode} />
          </Tooltip>
        </div>
      </ReactFlow>
    </div>
  );
}
export default memo(Board);
