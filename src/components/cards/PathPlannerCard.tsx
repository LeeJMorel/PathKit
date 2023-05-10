import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PathObject, { PathObjectProps } from "../objects/PathObject";
import { usePaths } from "../../hooks";
import styles from "./Card.module.scss";

interface IPathPlannerCardProps extends React.HTMLProps<HTMLDivElement> {}

function PathPlannerCard({ className, ...rest }: IPathPlannerCardProps) {
  const { paths } = usePaths();
  const containerRef = useRef<HTMLDivElement | null>(null); // Provide type assertion for containerRef

  const handleScrollLeft = () => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    const containerElement = containerRef.current;
    if (containerElement) {
      if (e.deltaY > 0) {
        containerElement.scrollBy({ left: 20 });
      }
      if (e.deltaY < 0) {
        containerElement.scrollBy({ left: -20 });
      }
    }
  };

  return (
    <div className={classNames(styles.card, className)}>
      <div
        className={styles.PathPlannerCardScrollLeft}
        onClick={handleScrollLeft}
      >
        <FontAwesomeIcon icon="arrow-left" />
      </div>
      <div
        className={styles.PathPlannerCardScrollContainer}
        ref={containerRef}
        onWheel={handleScroll}
      >
        {paths.length > 0 ? (
          <div className={styles.PathPlannerCardScrollCard}>
            {paths.map((path) => (
              <PathObject key={path.id} path={path} />
            ))}
          </div>
        ) : (
          <div className={styles.PathPlannerCardPlaceholder}>
            <h2>Create a path with the button above.</h2>
          </div>
        )}
      </div>
      <div
        className={styles.PathPlannerCardScrollRight}
        onClick={handleScrollRight}
      >
        <FontAwesomeIcon icon="arrow-right" />
      </div>
    </div>
  );
}

export default PathPlannerCard;
