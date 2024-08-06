import { Drawer } from "@geist-ui/core";
import React from "react";
import Editor from "@monaco-editor/react";

export default function DrawerCode({ isOpen, toggleOpen, nodes, edges }) {
  const data = JSON.stringify({ nodes, edges }, null, 2);
  const [code, setCode] = React.useState(data);
  return (
    <Drawer visible={isOpen} onClose={toggleOpen} placement="right" width="700px">
      <Drawer.Title>Code</Drawer.Title>

      <Drawer.Content style={{ height: "100%" }}>
        <Editor
        className="br-8"
          height="100%"
          defaultLanguage="json"
          defaultValue={data}
          theme="vs-dark"
          
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
