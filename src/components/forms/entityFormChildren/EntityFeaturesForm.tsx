import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import FeatureForm from "./FeatureForm";

const EntityFeaturesForm: React.FC<IEntityFormChildrenProps> = ({ entity }) => {
  const [feature, setFeature] = useState<number[]>([]);

  const handleFeature = () => {
    setFeature([...feature, feature.length + 1]);
  };
  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleFeature}>
          Add Features
        </Button>
      </div>
      {feature.map((_, index) => (
        <FeatureForm entity={entity} key={index} index={index + 1} />
      ))}
    </>
  );
};

export default EntityFeaturesForm;
