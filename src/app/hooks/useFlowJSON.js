import { useReactFlow } from "@xyflow/react";
import { downloadDiagram } from "../helpers/utils";
export default function useFlowJSON() {
  const reactFlow = useReactFlow();

  const exportDiagramJSON = () => {
    const nodes = reactFlow.getNodes();
    const edges = reactFlow.getEdges();
    const json = {
      nodes,
      edges,
    };
    console.log(json);
    downloadDiagram(json);
  };

  return {
    exportDiagramJSON,
  };
}
