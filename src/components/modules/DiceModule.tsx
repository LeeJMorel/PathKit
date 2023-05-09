import { useEffect, useState } from "react";
import styles from "./Modules.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

// import UnityLoader script
import "../../../dice-resources/Downloads.loader.js";

const unityContainerId = "unity-container";

const DiceModule = () => {
  const unityContext = useUnityContext();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // create UnityLoader instance and load the build
    const unityLoader = new UnityLoader();
    unityLoader
      .load(unityContainerId, "/dice-resources/Downloads.json", {
        onProgress: unityContext.setLoadingProgress,
        onComplete: unityContext.setLoadingComplete,
      })
      .catch((error) => {
        console.error(error);
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

  return (
    <div className={styles.moduleContainer}>
      <div className={styles.moduleContent}>
        <div id={unityContainerId}>
          <Unity unityContext={unityContext} />
        </div>
      </div>
    </div>
  );
};

export default DiceModule;
