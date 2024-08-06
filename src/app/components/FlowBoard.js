"use client";
import DrawerMenu from "./DrawerMenu";
import PromptInput from "./PromptInput";
import SettingsButton from "./SettingsButton";
import useFlowBoard from "../hooks/useFlowBoard";
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
  } = useFlowBoard();

  return (
    <>
      <SettingsButton toggleOpen={toggleOpen} />

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
