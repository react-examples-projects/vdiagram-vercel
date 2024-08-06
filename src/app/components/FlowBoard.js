"use client";
import DrawerMenu from "./DrawerMenu";
import PromptInput from "./PromptInput";
import SettingsButton from "./SettingsButton";
import useFlowBoard from "../hooks/useFlowBoard";
import DrawerCode from "./DrawerCode";
import CodeButton from "./CodeButton";
import Board from "./Board";

export default function FlowBoard() {
  const {
    onReconnectEnd,
    onReconnect,
    onReconnectStart,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onChangeText,
    onChangePrompt,
    isOpen,
    toggleOpen,
    isMagicText,
    isLoading,
    prompt,
    stop,
    onChangeIsMagicText,
    generateDiagram,
    importJSONDiagram,
    isOpenCode,
    toggleOpenCode,
  } = useFlowBoard();

  return (
    <>
      <SettingsButton toggleOpen={toggleOpen} />

      <CodeButton toggleOpen={toggleOpenCode} />

      <PromptInput
        {...{
          isLoading,
          prompt,
          onChangePrompt,
          onChangeText,
          generateDiagram,
          stop,
        }}
      />

      <Board
        {...{
          edges,
          nodes,
          onConnect,
          onNodesChange,
          onEdgesChange,
          onReconnect,
          onReconnectStart,
          onReconnectEnd,
          importJSONDiagram,
        }}
      />

      <DrawerCode isOpen={isOpenCode} toggleOpen={toggleOpenCode} nodes={nodes} edges={edges} />

      <DrawerMenu
        {...{
          isOpen,
          toggleOpen,
          isMagicText,
          onChangeIsMagicText,
        }}
      />
    </>
  );
}
