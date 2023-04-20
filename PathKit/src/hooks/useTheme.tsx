import { useLayoutEffect } from "react";
import "../styles/theme.scss";

interface Theme {
  [name: string]: string;
}

function useTheme(theme: Theme): void {
  useLayoutEffect(
    (): void => {
      // Iterate through each value in theme object
      for (const key in theme) {
        // Update css variables in document's root element
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    },
    [theme] // Only call again if theme object reference changes
  );
}

export default useTheme;
