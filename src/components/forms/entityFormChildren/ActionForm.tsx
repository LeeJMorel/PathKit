import { FieldArray } from "formik";
import { PartialEntity } from "src/api/model";
import styles from "../Form.module.scss";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import FormField from "../../formFields/FormField";

const ActionForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
  index = 0,
  onRemove,
}) => {
  const { values } = formProps;
  return (
    <>
      <CollapsibleHeader
        title={`Action ${index + 1}`}
        toggle
        onRemove={onRemove}
      >
        {/* <FieldArray name={`build.actions.actions.${index}`}>
          {({ remove, push }) => values?.build?.actions.actions.map(action => {

          })}

        </FieldArray> */}
      </CollapsibleHeader>
    </>
  );
};

export default ActionForm;
