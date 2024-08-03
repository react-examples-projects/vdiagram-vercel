const SSR = typeof window === "undefined";

const partialNodesRegex = /^\s*\{\s*"nodes"\s*:\s*\[.*\}\s*\,?\s*$/s;
const partialEdgesRegex = /^\s*\{\s*"edges"\s*:\s*\[.*\}\s*\,?\s*$/s;

export function parsePartialNodesJSON(jsonString) {
  try {
    console.log("Parsing nodes:", jsonString);
    jsonString = jsonString.trim();

    // Verificar con la expresión regular
    if (!partialNodesRegex.test(jsonString)) {
      console.log("Nodes regex did not match");
      return [];
    }

    let lastClosingBracketIndex = jsonString.lastIndexOf("}");
    if (lastClosingBracketIndex !== -1) {
      jsonString = jsonString.substring(0, lastClosingBracketIndex + 1);
      jsonString += "]}";
      let data = JSON.parse(jsonString);
      if (data.nodes && data.nodes.length > 0) {
        return data.nodes;
      }
      return [];
    }
    return [];
  } catch (e) {
    console.log("Error parsing nodes:", e);
    return [];
  }
}

export function parsePartialEdgesJSON(jsonString) {
  try {
    console.log("Parsing edges:", jsonString);
    jsonString = jsonString.trim();

    // Verificar con la expresión regular
    if (!partialEdgesRegex.test(jsonString)) {
      console.log("Edges regex did not match");
      return [];
    }

    let lastClosingBracketIndex = jsonString.lastIndexOf("}");
    if (lastClosingBracketIndex !== -1) {
      jsonString = jsonString.substring(0, lastClosingBracketIndex + 1);
      jsonString += "]}";
      let data = JSON.parse(jsonString);
      if (data.edges && data.edges.length > 0) {
        return data.edges;
      }
      return [];
    }
    return [];
  } catch (e) {
    console.log("Error parsing edges:", e);
    return [];
  }
}




// export function parsePartialNodesJSON(jsonString) {
//   try {
//     jsonString = jsonString.trim();

//     let lastClosingBracketIndex = jsonString.lastIndexOf("}");
//     if (lastClosingBracketIndex !== -1) {
//       jsonString = jsonString.substring(0, lastClosingBracketIndex + 1);
//       jsonString += "]}";
//       let data = JSON.parse(jsonString);
//       if (data.nodes && data.nodes.length > 0) {
//         return data.nodes;
//       }
//       return [];
//     }
//     return [];
//   } catch (e) {
//     console.error("Error al parsear el JSON:", e);
//     return [];
//   }
// }

// export function parsePartialEdgesJSON(jsonString) {
//   try {
//     jsonString = jsonString.trim();

//     let lastClosingBracketIndex = jsonString.lastIndexOf("}");
//     if (lastClosingBracketIndex !== -1) {
//       jsonString = jsonString.substring(0, lastClosingBracketIndex + 1);
//       jsonString += "]}";
//       let data = JSON.parse(jsonString);
//       if (data.edges && data.edges.length > 0) {
//         return data.edges;
//       }
//       return [];
//     }
//     return [];
//   } catch (e) {
//     console.error("Error al parsear el JSON:", e);
//     return [];
//   }
// }

export function generateFilename({ name, fileType }) {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")}`;

  const timeStr = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(
    2,
    "0"
  )}${String(now.getSeconds()).padStart(2, "0")}`;

  const fileNamePrefix = name ? `${name}_` : "reactflow_";
  const fileName = `${fileNamePrefix}${dateStr}_${timeStr}.${fileType}`;
  return fileName;
}

export function downloadFile({ dataUrl, fileType, name }) {
  const fileName = generateFilename({ name, fileType });
  const a = document.createElement("a");

  a.setAttribute("download", fileName);
  a.setAttribute("href", dataUrl);
  a.click();
}

export function createURLFile(data, title) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const filename = generateFilename({ name: title, fileType: "json" });
  const file = new File([blob], filename, {
    type: "application/json",
  });
  const url = URL.createObjectURL(file);
  return url;
}

export function downloadDiagram(data) {
  const url = createURLFile(data, "diagram");
  downloadFile({ dataUrl: url, fileType: "json", name: "diagram" });
}

export function setLocalStorage(key, value) {
  if (SSR) return;

  localStorage.setItem(key, JSON.stringify(value, null, 0));
}

export function getLocalStorage(key) {
  if (SSR) return;

  return JSON.parse(localStorage.getItem(key));
}

export function removeLocalStorage(key) {
  if (SSR) return;

  localStorage.removeItem(key);
}
