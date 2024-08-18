"use client";
import useToast from "../hooks/useToast";
import { useState, useCallback, useRef, useEffect } from "react";
import { useToggle } from "usehooks-ts";
import {
  parsePartialEdgesJSON,
  parsePartialNodesJSON,
  setLocalStorage,
  getLocalStorage,
  createInputFile,
} from "../helpers/utils";
import { addEdge, reconnectEdge, useNodesState, useEdgesState } from "@xyflow/react";
import { useCompletion } from "ai/react";
import useConfig from "../hooks/useConfig";

const initialNodes = [
  {
    id: "1",
    // type: "input",
    type: "customNode",
    data: { label: "Start Process" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "Receive Order" },
    position: { x: 250, y: 100 },
  },
  {
    id: "3",
    data: { label: "Check Inventory" },
    position: { x: 250, y: 175 },
  },
  {
    id: "4",
    data: { label: "Inventory Available?" },
    position: { x: 250, y: 250 },
  },
  {
    id: "5",
    data: { label: "Process Payment" },
    position: { x: 100, y: 325 },
  },
  {
    id: "6",
    data: { label: "Notify Customer" },
    position: { x: 400, y: 325 },
  },
  {
    id: "7",
    data: { label: "Ship Order" },
    position: { x: 250, y: 400 },
  },
  {
    id: "8",
    type: "output",
    data: { label: "End Process" },
    position: { x: 250, y: 475 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5", label: "Yes" },
  { id: "e4-6", source: "4", target: "6", label: "No" },
  { id: "e5-7", source: "5", target: "7" },
  { id: "e6-7", source: "6", target: "7" },
  { id: "e7-8", source: "7", target: "8" },
];

export default function useFlowBoard() {
  const { openAiApiKey } = useConfig();
  const { info, success, error, warn } = useToast();
  const diagramResult = getLocalStorage("diagramResult");
  const edgeReconnectSuccessful = useRef(true);
  const [isOpen, toggleOpen] = useToggle();
  const [isMagicText, setIsMagicText] = useState(getLocalStorage("isMagicText") ?? true);
  const [isOpenCode, toggleOpenCode] = useToggle();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    () => diagramResult?.nodes ?? initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    () => diagramResult?.edges ?? initialEdges
  );
  const [prompt, setPrompt] = useState(
    diagramResult?.prompt ??
      "Develop a sales system to manage customer orders, process payments, and generate invoices"
  );

  const { complete, completion, isLoading, stop } = useCompletion({
    api: "/api/generate",
    onError: (err) => {
      console.error(err);
      error(err.message ?? "Error generating diagram");
    },
    onFinish: (prompt, data) => {
      const { nodes, edges } = JSON.parse(data);
      setLocalStorage("diagramResult", {
        nodes,
        edges,
        prompt,
      });
      setNodes(nodes);
      setEdges(edges);
      success("Diagram generated successfully");
    },
  });

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => {
        const diagramResult = getLocalStorage("diagramResult");
        const newEdges = reconnectEdge(oldEdge, newConnection, els);
        setLocalStorage("diagramResult", {
          ...diagramResult,
          edges: newEdges,
        });
        return newEdges;
      });
    },
    [setEdges]
  );

  const onReconnectEnd = useCallback(
    (_, edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => {
          const diagramResult = getLocalStorage("diagramResult");
          const newEdges = eds.filter((e) => e.id !== edge.id);
          setLocalStorage("diagramResult", {
            ...diagramResult,
            edges: newEdges,
          });
          return newEdges;
        });
      }

      edgeReconnectSuccessful.current = true;
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const diagramResult = getLocalStorage("diagramResult");
        const newEdges = addEdge(params, eds);
        setLocalStorage("diagramResult", {
          ...diagramResult,
          edges: newEdges,
        });

        return newEdges;
      });
    },
    [setEdges]
  );

  const onChangeText = useCallback((e) => {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + 20 + "px";
  }, []);

  const onChangePrompt = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const onChangeIsMagicText = useCallback((e) => {
    setIsMagicText(e.target.checked);
    setLocalStorage("isMagicText", e.target.checked);
  }, []);

  const generateDiagram = useCallback(() => {
    info("Generating diagram...");
    complete(prompt, {
      body: { isMagicText, openAiApiKey },
    });
  }, [complete, prompt, info, isMagicText, openAiApiKey]);

  const cancelDiagram = useCallback(() => {
    warn("Cancelled diagram generation");
    stop();
  }, [stop, warn]);

  const onNodesChangePosition = useCallback(
    (nodes) => {
      const diagramResult = getLocalStorage("diagramResult");
      let $nodes = structuredClone(nodes); // no modify the original nodes oject passsed to diagram
      $nodes = $nodes.filter((node) => node.type === "position");

      if ($nodes.length > 0 && diagramResult?.nodes?.length > 0) {
        $nodes.forEach((node) => {
          const nodeId = node.id;
          const { x, y } = node.position;

          diagramResult.nodes.forEach((node) => {
            if (node.id === nodeId) {
              node.position.x = x;
              node.position.y = y;
            }
          });
        });

        setLocalStorage("diagramResult", diagramResult);
      }

      onNodesChange(nodes);
    },
    [onNodesChange]
  );

  const importJSONDiagram = useCallback(async () => {
    const json = await createInputFile();
    const { nodes, edges } = json;
    const prevDiagramResult = getLocalStorage("diagramResult");
    setLocalStorage("diagramResult", {
      ...prevDiagramResult,
      nodes,
      edges,
    });
    setNodes(nodes);
    setEdges(edges);
  }, [setEdges, setNodes]);

  useEffect(() => {
    if (!completion) return;

    const nodes = parsePartialNodesJSON(completion);
    const edges = parsePartialEdgesJSON(completion);

    if (nodes?.length > 0) {
      setNodes(nodes);
    }

    if (edges?.length > 0) {
      setEdges(edges);
    }
  }, [completion, setNodes, setEdges]);

  useEffect(() => {
    const diagramResult = getLocalStorage("diagramResult");
    if(!diagramResult){
      setLocalStorage("diagramResult", {
        nodes,
        edges,
        prompt,
      });
    }
  }, [nodes, edges, prompt]);


  return {
    onReconnectEnd,
    onReconnect,
    onReconnectStart,
    onNodesChange: onNodesChangePosition,
    onEdgesChange,
    onConnect,
    onChangeText,
    onChangePrompt,
    isOpen,
    toggleOpen,
    isMagicText,
    isLoading,
    prompt,
    onChangeIsMagicText,
    generateDiagram,
    nodes,
    edges,
    setNodes,
    setEdges,
    stop: cancelDiagram,
    importJSONDiagram,
    isOpenCode,
    toggleOpenCode,
  };
}
