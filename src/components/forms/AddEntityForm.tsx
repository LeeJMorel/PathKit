import { useEffect, useState, useCallback } from "react";
import styles from "./Form.module.scss";
import { EntityType, PartialEntity } from "../../api/model";
import { useEntities } from "../../hooks";
import { defaultEntity } from "../../consts";
import { Button } from "../buttons";
import classNames from "classnames";
import { getEntityFormFields } from "./EntityFormFields";
import FormField from "../inputs/FormField";
import { TextInput } from "../inputs";

export interface IEntityFormProps {
  entityData: PartialEntity;
  onAddEntity: (entity: PartialEntity) => void;
  onClose?: () => void;
}

const AddEntityForm: React.FC<IEntityFormProps> = ({
  entityData,
  onAddEntity,
  onClose,
}) => {
  // const { updateOrAddEntity, getEntityById } = useEntities();
  const [entity, setEntity] = useState<PartialEntity>(entityData);

  useEffect(() => {
    setEntity(entityData);
  }, [entityData]);

  const handleAddEntity = async (e: React.FormEvent) => {
    onAddEntity(entity);
  };

  const handleInputChange = (name: string, value: any) => {
    console.log("handleInputChange", { name, value });

    setEntity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (name: string, result: FileReader["result"]) => {
    console.log("debug: handlefileupload", { name, result });
    setEntity((prev) => ({
      ...prev,
      [name]: result,
    }));
  };

  console.log("addentityform", { entity, entityData });

  return (
    <form className={styles.formContainer} onSubmit={handleAddEntity}>
      <div className={styles.formRow}>
        <FormField
          inputType="file"
          label="Image"
          name="image"
          value={entity.image}
          onUpload={handleFileUpload}
        />
      </div>
      <div className={styles.formRow}>
        <FormField
          inputType="text"
          name="name"
          value={entity.name}
          onChange={handleInputChange}
          label="Name"
          validation={(value: string) => value.length > 0}
        />
      </div>
      <div className={classNames(styles.formRow, styles.actionRow)}>
        <Button type="submit" variant="primary">
          Save {entity.type}
        </Button>
      </div>
    </form>
  );
};

export default AddEntityForm;
