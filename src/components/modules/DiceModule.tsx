import { useEffect, useState } from "react";
import styles from "./Modules.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useResources } from "../../hooks";

function DiceModule() {
  const { loaderPath, dataPath, frameworkPath, wasmPath } = useResources();

  const { unityProvider } = useUnityContext({
    loaderUrl: loaderPath,
    dataUrl: dataPath,
    frameworkUrl: frameworkPath,
    codeUrl: wasmPath,
  });

  //this checks if the unity component loaded, if not we show an error message
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch(frameworkPath)
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  if (hasError) {
    return (
      <div className={styles.moduleContainer}>
        <div className={styles.moduleContent}>
          <div className={styles.moduleHeader}>Dice module not available</div>
        </div>
      </div>
    );
  }

  //this is our game loader
  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleContent}>
        <Unity unityProvider={unityProvider} />
      </div>
    </div>
  );
}

export default DiceModule;
