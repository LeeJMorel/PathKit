import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Card.module.scss";
import PlannerObject, { PlannerObjectProps } from "./PlannerObject";
import { useStore } from "../../hooks";

function PlannerCard() {
  const plans = useStore((store) => store.plans);
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
    <div className={styles.card}>
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
              <PlannerObject key={plan.id} plan={plan} />
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
