import { useCallback } from "react";

export enum Platform {
  Windows = "windows",
  MacOS = "macos",
  Linux = "linux",
  Tar = "tar",
  Tutorial = "Tutorial",
}

const downloadLinks: Record<Platform, string> = {
  [Platform.Windows]:
    "https://github.com/LeeJMorel/PathKit/releases/download/v0.1.2-beta/PathKit_0.1.2_x64_en-US.msi",
  [Platform.MacOS]:
    "https://github.com/LeeJMorel/PathKit/releases/download/v0.1.2-beta/PathKit_0.1.2_x64.dmg",
  [Platform.Linux]:
    "https://github.com/LeeJMorel/PathKit/releases/download/v0.1.2-beta/path-kit_0.1.2_amd64.deb",
  [Platform.Tar]:
    "https://github.com/LeeJMorel/PathKit/releases/download/v0.1.2-beta/PathKit_x64.app.tar.gz",
  [Platform.Tutorial]:
    "https://github.com/LeeJMorel/PathKit/releases/download/tutorial/pathkit-campaign-PathKit.Tutorial.Demo.json",
};

const getPlatform = (): Platform => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("win")) {
    return Platform.Windows;
  } else if (userAgent.includes("mac")) {
    return Platform.MacOS;
  } else if (userAgent.includes("linux")) {
    return Platform.Linux;
  } else {
    throw new Error("Unsupported platform");
  }
};

const useDownload = (platform?: Platform): (() => Promise<void>) => {
  //   const [usePlatform, setUsePlatform] = useState<Platform>(getPlatform());
  const usePlatform = platform || getPlatform();

  const handleClick = useCallback(async () => {
    // console.log("handleClick", usePlatform);
    // const response = await fetch(
    //   "https://api.github.com/repos/LeeJMorel/PathKit/releases/latest"
    // );
    // console.log(response);
    // const data = await response.json();
    // const version = data.tag_name;

    const link = downloadLinks[usePlatform];
    window.open(link, "_blank");
  }, [usePlatform]);

  return handleClick;
};

export default useDownload;
