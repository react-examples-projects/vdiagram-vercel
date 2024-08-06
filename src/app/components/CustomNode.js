import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }) => {
  console.log("customNode");
  return (
    <div className=" react-flow__node-default">
      <Handle type="target" position={Position.Top} id="t" />
      <Handle type="target" position={Position.Bottom} id="b" />
      <Handle type="target" position={Position.Left} id="l" />
      <Handle type="target" position={Position.Right} id="r" />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Top} id="t-source" />
      <Handle type="source" position={Position.Bottom} id="b-source" />
      <Handle type="source" position={Position.Left} id="l-source" />
      <Handle type="source" position={Position.Right} id="r-source" />
    </div>
  );
};

export default memo(CustomNode);
