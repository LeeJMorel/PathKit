import { useEffect, useState } from "react";
import { resolveResource } from "@tauri-apps/api/path";

export function useResources() {
  const [loaderPath, setLoaderPath] = useState("");
  const [dataPath, setDataPath] = useState("");
  const [frameworkPath, setFrameworkPath] = useState("");
  const [wasmPath, setWasmPath] = useState("");

  useEffect(() => {
    async function loadResources() {
      const loader = await resolveResource(
        "dice-resources/Downloads.loader.js"
      );
      const data = await resolveResource("dice-resources/Downloads.data.gz");
      const framework = await resolveResource(
        "dice-resources/Downloads.framework.js.gz"
      );
      const wasm = await resolveResource("dice-resources/Downloads.wasm.gz");
      setLoaderPath(loader);
      setDataPath(data);
      setFrameworkPath(framework);
      setWasmPath(wasm);
    }
    loadResources();
  }, []);

  return { loaderPath, dataPath, frameworkPath, wasmPath };
}
