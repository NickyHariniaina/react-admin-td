import {
  BooleanInput,
  Edit,
  FormDataConsumer,
  NumberInput,
  ReferenceInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { useWatch } from "react-hook-form";

const InternTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      Modifier : {record.prenom} {record.nom}
    </span>
  );
};

const validateEmail = regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Format d'email invalide",
);

const SalaryInput = () => {
  const hasSalary = useWatch({ name: "hasSalary" });

  const validateSalary = (value: number | null | undefined) => {
    if (hasSalary && (!value || value <= 0)) {
      return "Le salaire est obligatoire si rémunéré";
    }
    return undefined;
  };

  return <NumberInput source="salary" validate={[validateSalary]} />;
};

export const InternEdit = () => (
  <Edit title={<InternTitle />}>
    <SimpleForm>
      <TextInput source="prenom" validate={[required()]} />
      <TextInput source="nom" validate={[required()]} />
      <TextInput source="email" validate={[required(), validateEmail]} />
      <SelectInput
        source="department"
        validate={[required()]}
        choices={[
          { id: "informatique", name: "Informatique" },
          { id: "marketing", name: "Marketing" },
          { id: "RH", name: "RH" },
        ]}
      />
      <FormDataConsumer>
        {({ formData }) => (
          <ReferenceInput
            source="idManager"
            reference="employees"
            filter={{
              department: formData.department,
              isActive: true,
            }}
          >
            <SelectInput optionText="firstname" label="Manager" />
          </ReferenceInput>
        )}
      </FormDataConsumer>
      <SalaryInput />
      <BooleanInput source="hasSalary" defaultValue={false} />
    </SimpleForm>
  </Edit>
);
