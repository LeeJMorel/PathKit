import styles from "./App.module.scss";
import { useDarkMode } from "usehooks-ts";
import classNames from "classnames";
import { Button, ToggleButton } from "./components/buttons";
import useDownload, { Platform } from "./hooks/useDownload";
import dark from "./assets/dark.png";
import light from "./assets/light.png";
import YouTube, { YouTubeProps } from "react-youtube";
import Logo from "./assets/bigPKIcon.png";

function App() {
  const { isDarkMode, enable, disable } = useDarkMode();
  const downloadAuto = useDownload();
  const downloadWin = useDownload(Platform.Windows);
  const downloadMac = useDownload(Platform.MacOS);
  const downloadTar = useDownload(Platform.Tar);
  const downloadLinux = useDownload(Platform.Linux);
  const downloadTutorial = useDownload(Platform.Tutorial);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDemo = () => {
    window.open(
      "https://main--fantastic-pegasus-e6a1d9.netlify.app/",
      "_blank"
    );
  };

  const handleGithub = () => {
    window.open("https://github.com/LeeJMorel/PathKit", "_blank");
  };

  const heroBackgroundImage = isDarkMode ? dark : light;

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div
      className={classNames(
        styles.app,
        isDarkMode ? styles.dark : styles.parchment
      )}
    >
      <div className={styles.grid}>
        <div className={styles.heroBackground}>
          <div className={styles.header}>
            <div className={styles.headerEnd}>
              <img
                src="/src/assets/bigPKIcon.png"
                alt="PathKit Logo"
                className={styles.responsiveImage}
              />
            </div>
            <div className={styles.headerContent}>
              <a
                href="#download"
                className={styles.headerLink}
                onClick={() => scrollToSection("download")}
              >
                Download
              </a>
              <a
                href="#explore"
                className={styles.headerLink}
                onClick={() => scrollToSection("explore")}
              >
                Explore
              </a>
              <a
                href="#support"
                className={styles.headerLink}
                onClick={() => scrollToSection("support")}
              >
                Support
              </a>
            </div>
            <div className={styles.headerEnd}>
              <ToggleButton
                options={["⬤", "◯"]}
                value={isDarkMode ? "⬤" : "◯"}
                onChange={(value) => {
                  if (value === "⬤") {
                    enable();
                  } else {
                    disable();
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.heroContent}>
            <div
              className={styles.heroImage}
              style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            />
            <div className={styles.heroText}>
              <h1>
                Your players have their adventuring kits, but do you have yours?
              </h1>
              <p>
                Your maps are drawn, the snacks are open, your players wait with
                bated breathe to journey down their next path. Be prepared for
                the the road ahead with your perfect GM companion.
              </p>
              <Button
                variant={"primary"}
                className={styles.buttonLarge}
                onClick={downloadAuto}
              >
                ⇩ Download PathKit
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <section id="download" className={styles.sectionContent}>
          <h2>Download</h2>
          <p>
            New to playing Pathfinder? We recommend you download our tutorial
            campaign by selecting the button below. Once you have installed
            PathKit select Import Campaign and select the tutorial campaign from
            your downloads.
          </p>
          <Button className={styles.buttonTutorial} onClick={downloadTutorial}>
            Download Tutorial Campaign
          </Button>
          <div className={styles.downloadSection}>
            <div className={styles.downloadItem}>
              <h3>Linux</h3>
              <Button className={styles.buttonMargin} onClick={downloadLinux}>
                Download .deb
              </Button>
              <Button className={styles.buttonMargin} onClick={downloadTar}>
                Download .tar.gz
              </Button>
            </div>
            <div className={styles.downloadItem}>
              <h3>Windows</h3>
              <Button className={styles.buttonMargin} onClick={downloadWin}>
                Download
              </Button>
            </div>
            <div className={styles.downloadItem}>
              <h3>macOS</h3>
              <Button className={styles.buttonMargin} onClick={downloadMac}>
                Download
              </Button>
            </div>
          </div>
        </section>
        <section id="explore" className={styles.sectionContent}>
          <h2>Explore</h2>
          <YouTube videoId="HHFSkAdBkdI" opts={opts} onReady={onPlayerReady} />
          <h3>Demo</h3>
          <p>
            You can check out a demo of Pathkit to see if you think the tool may
            work for your party! Add players, paths to explore, monsters, and
            mayhem! For full feature's press download above.
          </p>
          <Button className={styles.buttonMargin} onClick={handleDemo}>
            Demo
          </Button>
        </section>
        <section id="support" className={styles.sectionContent}>
          <h2>Support</h2>
          <p>
            Looking for a way to connect with the developers of PathKit and
            offer your support? Look no further than our Github page! By
            following us on Github, you'll be able to stay up-to-date on all the
            latest developments and get involved in the conversation. Whether
            you're an experienced developer or just starting out, there's a
            place for you on our team. So why wait? Head over to our Github page
            today and start connecting with the PathKit community!
          </p>
          <Button className={styles.buttonMargin} onClick={handleGithub}>
            Checkout our github!
          </Button>
        </section>
      </div>
    </div>
  );
}

export default App;
