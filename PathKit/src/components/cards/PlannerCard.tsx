import { useRef } from "react";
import styles from "./Card.module.scss";
import PlannerObject, { PlannerObjectProps } from "./PlannerObject";
import { useStore } from "../../hooks";

function PlannerCard() {
  const plans = useStore((store) => store.plans);
  const containerRef = useRef<HTMLDivElement | null>(null); // Provide type assertion for containerRef

  console.log({ plans });
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
        {/* Placeholder for left arrow icon */}
        &lt;
      </div>
      <div
        className={styles.plannerCardScrollContainer}
        ref={containerRef}
        onWheel={handleScroll}
      >
        <div className={styles.plannerCardScrollCard}>
          {plans.map((plan, index) => (
            <PlannerObject key={index} plan={plan} />
          ))}
        </div>
      </div>
      <div
        className={styles.plannerCardScrollRight}
        onClick={handleScrollRight}
      >
        {/* Placeholder for right arrow icon */}
        &gt;
      </div>
    </div>
  );
}

export default PlannerCard;
