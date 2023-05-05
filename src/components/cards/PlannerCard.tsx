import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PlannerObject, { PlannerObjectProps } from "../objects/PlannerObject";
import { usePlans } from "../../hooks";
import styles from "./Card.module.scss";

interface IPlannerCardProps extends React.HTMLProps<HTMLDivElement> {}

function PlannerCard({ className, ...rest }: IPlannerCardProps) {
  const { plans } = usePlans();
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
      <div className={styles.plannerCardScrollLeft} onClick={handleScrollLeft}>
        <FontAwesomeIcon icon="arrow-left" />
      </div>
      <div
        className={styles.plannerCardScrollContainer}
        ref={containerRef}
        onWheel={handleScroll}
      >
        {plans.length > 0 ? (
          <div className={styles.plannerCardScrollCard}>
            {plans.map((plan) => (
              <PlannerObject key={plan.planId} plan={plan} />
            ))}
          </div>
        ) : (
          <div className={styles.plannerCardPlaceholder}>
            <h2>Create a plan with the button above.</h2>
          </div>
        )}
      </div>
      <div
        className={styles.plannerCardScrollRight}
        onClick={handleScrollRight}
      >
        <FontAwesomeIcon icon="arrow-right" />
      </div>
    </div>
  );
}

export default PlannerCard;
