import { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import styles from "./Form.module.scss";
import { useMigrate } from "../../hooks";
import { Button } from "../buttons";
import { FormField, FileUploader } from "../formFields";

interface INewCampaignFormProps {
  onSubmit?: (id: string) => void;
}
const ImportCampaignForm = ({ onSubmit }: INewCampaignFormProps) => {
  const { importCampaignFromJSON } = useMigrate();

  interface IImportJson {
    [key: string]: string;
  }
  const handleSubmit = async (values: IImportJson) => {
    const importedCampaign = await importCampaignFromJSON(values.campaignJson);

    if (typeof onSubmit === "function") {
      if (importedCampaign) {
        onSubmit(importedCampaign.id);
      }
    }
  };

  return (
    <Formik
      initialValues={{
        campaignJson: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object({
        campaignJson: yup.string().required("Required"),
      })}
    >
      {(props) => (
        <Form className={styles.formContainer}>
          <div className={styles.formRow}>
            <FileUploader
              label="Upload PathKit JSON"
              maxSizeInMB={100}
              name="campaignJson"
              onUpload={(value) => props.setFieldValue("campaignJson", value)}
              labelPosition="inline"
              accept="application/JSON"
            >
              Select JSON
            </FileUploader>
          </div>
          <div className={styles.formRow}>
            <FormField
              name="campaignJson"
              as="textarea"
              label="Or Paste JSON"
              labelPosition="above"
              style={{ resize: "vertical", height: 300 }}
              height={300}
            />
          </div>
          <Button type="submit" variant="primary" disabled={!props.isValid}>
            Import Campaign
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ImportCampaignForm;
