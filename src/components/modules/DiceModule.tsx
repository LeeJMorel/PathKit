import { useEffect, useState } from "react";
import styles from "./Modules.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

function DiceModule() {
  //this connects to unity
  const { unityProvider } = useUnityContext({
    loaderUrl: "../../../dice-resources/Downloads.loader.js",
    dataUrl: "../../../dice-resources/Downloads.data",
    frameworkUrl: "../../../dice-resources/Downloads.framework.js",
    codeUrl: "../../../dice-resources/Downloads.wasm",
  });

  //this checks if the unity component loaded, if not we show an error message
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch("../../../dice-resources/Downloads.framework.js")
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
