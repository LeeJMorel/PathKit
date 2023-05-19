import { useEffect, useState } from "react";
import styles from "./Modules.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

function DiceModule() {

  // loads the unity components, do not change the ordering
  const { unityProvider } = useUnityContext({
     loaderUrl: "dice-resources/diceroller.loader.js",
     dataUrl: "dice-resources/webgl.data",
     frameworkUrl: "dice-resources/build.framework.js",
     codeUrl: "dice-resources/build.wasm",
  });

  //this checks if the unity component loaded, if not we show an error message
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    fetch("dice-resources/diceroller.loader.js")
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

        <Unity unityProvider={unityProvider} tabIndex={1} />

      </div>
    </div>
  );
}

export default DiceModule;
