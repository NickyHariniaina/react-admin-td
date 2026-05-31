import {
  BooleanInput,
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const EmployeeTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>Modifier : {record.firstname}</span>;
};

export const EmployeeEdit = () => {
  return (
    <Edit title={<EmployeeTitle />}>
      <SimpleForm>
        <TextInput source="firstname" validate={[required()]} />
        <TextInput source="email" validate={[required()]} />
        <SelectInput
          source="department"
          validate={[required()]}
          choices={[
            { id: "informatique", name: "Informatique" },
            { id: "marketing", name: "Marketing" },
            { id: "RH", name: "RH" },
          ]}
        />
        <NumberInput source="salary" validate={[required()]} min="1500" />
        <BooleanInput source="isActive" defaultValue={true} />
      </SimpleForm>
    </Edit>
  );
};
