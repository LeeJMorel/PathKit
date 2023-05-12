import { Field } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import { useState } from "react";
import { Button } from "../../buttons";
import EquipmentForm from "./EquipmentForm";

const EntityEquipmentForm: React.FC<IEntityFormChildrenProps> = ({
  entity,
}) => {
  const [equipment, setEquipment] = useState<number[]>([]);

  const handleEquipment = () => {
    setEquipment([...equipment, equipment.length + 1]);
  };
  return (
    <>
      <div className={styles.formCentered}>
        <Button className={styles.formButton} onClick={handleEquipment}>
          Add Equipment
        </Button>
      </div>
      {equipment.map((_, index) => (
        <EquipmentForm entity={entity} key={index} count={index + 1} />
      ))}
    </>
  );
};

export default EntityEquipmentForm;
