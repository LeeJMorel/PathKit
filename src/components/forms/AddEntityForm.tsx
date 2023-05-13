import { useEffect, useState, useCallback } from "react";
import styles from "./Form.module.scss";
import { PartialEntity } from "../../api/model";
import { Button } from "../buttons";
import classNames from "classnames";
import { Formik, Form, FormikProps } from "formik";
import Tabs from "../tabs/tab";
import {
  General,
  Equipment,
  Actions,
  Attacks,
  Spells,
  Features,
} from "./entityFormChildren";
import entityFormSchema from "../../consts/entityFormSchema";

export interface IEntityFormProps {
  entityData: PartialEntity;
  onAddEntity: (entity: PartialEntity) => void;
  onClose?: () => void;
}

export interface IEntityFormChildrenProps {
  entity: PartialEntity;
  count?: number;
  onImageUpload?: (result: FileReader["result"]) => void;
  formProps: FormikProps<PartialEntity>;
}

const AddEntityForm: React.FC<IEntityFormProps> = ({
  entityData,
  onAddEntity,
}) => {
  const [entity, setEntity] = useState<PartialEntity>(entityData);

  useEffect(() => {
    setEntity(entityData);
  }, [entityData]);

  const handleFileUpload = (name: string, result: FileReader["result"]) => {
    console.log("debug: handlefileupload", { name, result });
    setEntity((prev) => ({
      ...prev,
      [name]: result,
    }));
  };

  const tabs = (formProps: FormikProps<PartialEntity>) => [
    {
      id: "general",
      title: "General",
      content: (
        //onImageUpload={handleFileUpload}
        <General entity={entity} formProps={formProps} />
      ),
    },
    {
      id: "equipment",
      title: "Equipment",
      content: <Equipment entity={entity} formProps={formProps} />,
    },
    {
      id: "Actions",
      title: "Actions & Effects",
      content: <Actions entity={entity} formProps={formProps} />,
    },
    {
      id: "Attacks",
      title: "Attacks",
      content: <Attacks entity={entity} formProps={formProps} />,
    },
    {
      id: "Spells",
      title: "Spells",
      content: <Spells entity={entity} formProps={formProps} />,
    },
    {
      id: "Features",
      title: "Features",
      content: <Features entity={entity} formProps={formProps} />,
    },
  ];

  return (
    <Formik
      initialValues={entity}
      onSubmit={(values) => {
        // same shape as initial values
        //handleAddEntity
        onAddEntity(values);
      }}
      validationSchema={entityFormSchema}
    >
      {(props) => {
        return (
          <Form className={styles.formContainer}>
            <Tabs tabs={tabs(props)} className={styles.formTabs} />
            {props.errors.name && <div>{props.errors.name}</div>}
            <div className={classNames(styles.formRow, styles.actionRow)}>
              <Button type="submit" variant="primary">
                Save {entity.type}
              </Button>
            </div>
            {/* <div>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </div> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntityForm;
