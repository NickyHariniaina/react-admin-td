import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const EmployeeCreate = () => {
  return (
    <Create>
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
    </Create>
  );
};
