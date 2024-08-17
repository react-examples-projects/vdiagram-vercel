import { Button, Drawer } from "@geist-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { MdRestorePage } from "react-icons/md";
import { useState } from "react";
import useToast from "../hooks/useToast";
import React from "react";
import Editor from "@monaco-editor/react";
import { getLocalStorage } from "../helpers/utils";

export default function DrawerCode({ isOpen, toggleOpen, nodes, edges, setNodes, setEdges }) {
  const data = JSON.stringify({ nodes, edges }, null, 2);
  const [code, setCode] = useState(() => data);
  const { success } = useToast();

  const onChange = (value) => {
    const { nodes, edges } = JSON.parse(value);
    console.log({ nodes, edges });
    if (nodes.length > 0) {
      setNodes(nodes);
    }
    if (edges.length > 0) {
      setEdges(edges);
    }

    setCode(value);
  };

  const restoreDiagram = () => {
    const { nodes, edges } = getLocalStorage("diagramResult");
    console.log(JSON.stringify({ nodes, edges }, null, 2));
    setNodes(nodes);
    setEdges(edges);
    const oldCode = JSON.stringify({ nodes, edges }, null, 2);
    setCode(oldCode);
  };

  return (
    <Drawer visible={isOpen} onClose={toggleOpen} placement="right" width="550px">
      <Drawer.Title>Code</Drawer.Title>

      <Drawer.Content style={{ height: "100%" }}>
        <div className="mi-10">
          <CopyToClipboard text={data} onCopy={() => success("JSON copied to clipboard")}>
            <Button mb={1} scale={0.7} iconRight={<FaCopy />} auto>
              Copy JSON
            </Button>
          </CopyToClipboard>
          <Button
            mb={1}
            ml={0.5}
            scale={0.7}
            iconRight={<MdRestorePage fontSize={40} />}
            auto
            onClick={restoreDiagram}
          >
            Restore diagram
          </Button>
        </div>
        <Editor
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("onedark", {
              base: "vs-dark",
              inherit: true,
              rules: [
                {
                  foreground: "#000000",
                },
              ],
              colors: {
                "editor.background": "#000000",
              },
            });
          }}
          height="100%"
          language="json"
          value={code}
          theme="onedark"
          onChange={onChange}
          options={{
            lineNumbers: "off",
            minimap: { enabled: false },
            padding: 0,

            guides: {
              indentation: false,
            },
            fontSize: 14,
          }}
        />
      </Drawer.Content>
    </Drawer>
  );
}
