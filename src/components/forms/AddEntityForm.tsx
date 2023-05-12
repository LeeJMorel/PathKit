import { useEffect, useState, useCallback } from "react";
import styles from "./Form.module.scss";
import { EntityType, PartialEntity } from "../../api/model";
import { useEntities } from "../../hooks";
import { defaultEntity } from "../../consts";
import { Button } from "../buttons";
import classNames from "classnames";
import { Formik, Form, Field } from "formik";
import Tabs from "../tabs/tab";
import {
  General,
  Equipment,
  Actions,
  Attacks,
  Spells,
  Features,
} from "./entityFormChildren";

export interface IEntityFormProps {
  entityData: PartialEntity;
  onAddEntity: (entity: PartialEntity) => void;
  onClose?: () => void;
}

export interface IEntityFormChildrenProps {
  entity: PartialEntity;
  count?: number;
  onImageUpload?: (result: FileReader["result"]) => void;
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

  const tabs = [
    {
      id: "general",
      title: "General",
      content: (
        //onImageUpload={handleFileUpload}
        <General entity={entity} />
      ),
    },
    {
      id: "equipment",
      title: "Equipment",
      content: <Equipment entity={entity} />,
    },
    {
      id: "Actions",
      title: "Actions & Effects",
      content: <Actions entity={entity} />,
    },
    {
      id: "Attacks",
      title: "Attacks",
      content: <Attacks entity={entity} />,
    },
    {
      id: "Spells",
      title: "Spells",
      content: <Spells entity={entity} />,
    },
    {
      id: "Features",
      title: "Features",
      content: <Features entity={entity} />,
    },
  ];

  return (
    <Formik
      initialValues={entity}
      onSubmit={(values) => {
        // same shape as initial values
        //handleAddEntity
        console.log(values);
      }}
    >
      <Form className={styles.formContainer}>
        <Tabs tabs={tabs} />
        <div className={classNames(styles.formRow, styles.actionRow)}>
          <Button type="submit" variant="primary">
            Save {entity.type}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddEntityForm;
