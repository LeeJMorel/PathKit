import React, { useState } from "react";
import { Formik, Form } from "formik";
import { string, object } from "yup";
import { useNavigate } from "react-router-dom";
import merge from "lodash.merge";
import { Button } from "../buttons";
import FormField from "../formFields/FormField";
import styles from "./Objects.module.scss";
import { EntityType, PartialEntity } from "../../api/model";
import { useEntities } from "../../hooks";
import ConfirmMenu, { IConfirmMenuProps } from "../menus/ConfirmMenu";
import { defaultEntity, defaultEquipment } from "../../consts";
import { transformPathbuilderBuild } from "../../utilities";

interface IImportEntityProps {
  entity: PartialEntity;
}

interface PathbuilderResponse {
  success: boolean;
  build: PartialEntity["build"];
}

export const ImportEntity: React.FC<IImportEntityProps> = ({ entity }) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const initialDialog: IConfirmMenuProps = {
    title: undefined,
    children: undefined,
    confirmText: "OK",
    onConfirm: () => setShowConfirm(false),
    onClose: () => setShowConfirm(false),
    onCancel: () => setShowConfirm(false),
  };
  const [dialog, setDialog] = useState<IConfirmMenuProps>(initialDialog);
  const { updateOrAddEntity } = useEntities();
  const [pathbuilderId, setPathbuilderId] = useState("");

  const handleSubmit = async (values: PartialEntity): Promise<void> => {
    try {
      const response = await fetch(
        `https://pathbuilder2e.com/json.php?id=${pathbuilderId}`
      );
      if (response.ok) {
        const result: PathbuilderResponse = await response.json();

        if (result.success) {
          setDialog((prev) => ({
            ...prev,
            title: `Really import character: ${result.build.name}?`,
            children: (
              <>
                <p>
                  {result.build.name} is a level {result.build.level}{" "}
                  {result.build.ancestry} {result.build.class}
                </p>
                <p>
                  <strong>
                    THIS WILL OVERWRITE ANY DATA YOU HAVE FOR{" "}
                    {entity.name.toUpperCase()}
                  </strong>
                </p>
              </>
            ),
            confirmText: "Import",
            onConfirm: async () => {
              const newEntityData = {
                ...defaultEntity,
                ...values,
                type: EntityType.Player,
                name: result.build.name || values.name || "Unknown",
                build: merge(
                  values.build,
                  transformPathbuilderBuild(result.build)
                ),
              };
              const newEntity = await updateOrAddEntity(newEntityData);

              if (newEntity) {
                setDialog((prev) => ({
                  ...prev,
                  title: "Success!",
                  confirmText: "Cool",
                  cancelText: "Dismiss",
                  children: undefined,
                  message: "The character has been imported.",
                  onConfirm: () => {
                    setShowConfirm(false);
                    navigate(`/`);
                  },
                }));
              }
            },
          }));
        } else {
          setDialog((prev) => ({
            ...prev,
            title: "Not found",
            children: <p>Pathbuilder couldn&apos;t find that character.</p>,
          }));
        }
      }
      setShowConfirm(true);
    } catch (error) {}
  };

  return (
    <div className={styles.importObject}>
      <Formik
        initialValues={entity}
        onSubmit={async (values) => {
          // const { pathbuilderId } = values;
          if (pathbuilderId) return handleSubmit(values);
        }}
        // validationSchema={object({
        //   pathbuilderId: string()
        //     .matches(/^[0-9]{6}$/, "Must be 6 digits")
        //     .required("Required"),
        // })}
      >
        {({ values, dirty, isValid }) => (
          <Form className={styles.inlineForm}>
            <FormField
              label={
                <span>
                  Import character from{" "}
                  <a href="https://pathbuilder2e.com" target="_new">
                    Pathbuilder 2e
                  </a>
                </span>
              }
              name="pathbuilderId"
              value={pathbuilderId}
              placeholder="Pathbuilder JSON ID"
              className={styles.importField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPathbuilderId(e.target.value)
              }
            />
            <div className={styles.alignTop}>
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid}
                className={styles.submitButton}
              >
                Import
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {showConfirm && <ConfirmMenu {...dialog} />}
    </div>
  );
};

export default ImportEntity;
