import { useEffect, useState, useCallback } from "react";
import styles from "./Form.module.scss";
import { EntityType, PartialEntity } from "../../api/model";
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
import { getPlayerMaxHp } from "../../utilities";

export interface IEntityFormProps {
  entityData: PartialEntity;
  onAddEntity: (entity: PartialEntity) => void;
  onClose?: () => void;
  setFormDirty?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEntityFormChildrenProps {
  index?: number;
  formProps: FormikProps<PartialEntity>;
  onRemove?: () => void;
}

const AddEntityForm: React.FC<IEntityFormProps> = ({
  entityData,
  onAddEntity,
  setFormDirty,
}) => {
  const [entity, setEntity] = useState<PartialEntity>(entityData);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (typeof setFormDirty === "function") {
      setFormDirty(dirty);
    }
  }, [dirty, setFormDirty]);

  useEffect(() => {
    setEntity(entityData);
  }, [entityData]);

  const tabs = (formProps: FormikProps<PartialEntity>) => [
    {
      id: "general",
      title: "General",
      content: <General formProps={formProps} />,
    },
    {
      id: "equipment",
      title: "Equipment",
      content: <Equipment formProps={formProps} />,
    },
    {
      id: "Actions",
      title: "Actions",
      content: <Actions formProps={formProps} />,
    },
    {
      id: "Attacks",
      title: "Attacks",
      content: <Attacks formProps={formProps} />,
    },
    {
      id: "Spells",
      title: "Spells",
      content: <Spells formProps={formProps} />,
      disabled: true,
    },
    {
      id: "Features",
      title: "Features",
      content: <Features formProps={formProps} />,
    },
  ];

  const npcTabs = (formProps: FormikProps<PartialEntity>) => [
    {
      id: "general",
      title: "General",
      content: <General formProps={formProps} />,
    },
    {
      id: "equipment",
      title: "Equipment",
      content: <Equipment formProps={formProps} />,
    },
    {
      id: "Spells",
      title: "Spells",
      content: <Spells formProps={formProps} />,
      disabled: true,
    },
    {
      id: "Features",
      title: "Features",
      content: <Features formProps={formProps} />,
    },
  ];

  const structureTabs = (formProps: FormikProps<PartialEntity>) => [
    {
      id: "general",
      title: "General",
      content: <General formProps={formProps} />,
    },
    {
      id: "equipment",
      title: "Equipment",
      content: <Equipment formProps={formProps} />,
    },
  ];

  const renderTabs = (props: FormikProps<PartialEntity>) => {
    let tabsToRender;

    if (entity.type === "NPC") {
      tabsToRender = npcTabs(props);
    } else if (entity.type === "Shop") {
      tabsToRender = structureTabs(props);
    } else {
      tabsToRender = tabs(props);
    }

    return <Tabs tabs={tabsToRender} className={styles.formTabs} />;
  };

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
        setTimeout(() => {
          // Form value side effects
          if (!dirty) {
            setDirty(props.dirty);
          }
          if (props.values.type === EntityType.Player) {
            const newMaxHp = getPlayerMaxHp(props.values);
            if (newMaxHp !== props.values.maxHp) {
              props.setFieldValue("maxHp", getPlayerMaxHp(props.values));
            }
          }
        }, 1000);

        return (
          <Form className={styles.formContainer}>
            {renderTabs(props)}
            <div className={classNames(styles.formRow, styles.actionRow)}>
              <Button type="submit" variant="primary" disabled={!props.isValid}>
                Save {entity.type}
              </Button>
            </div>
            {/* <div>
              <pre>{JSON.stringify(props.errors, null, 2)}</pre>
            </div> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntityForm;
