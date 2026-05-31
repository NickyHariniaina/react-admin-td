import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const InternCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="firstname" validate={[required()]} />
        <ReferenceInput source="idManager" reference="employees">
          <SelectInput optionText="firstname" />
        </ReferenceInput>
        <NumberInput source="salary" validate={[required()]} />
        <BooleanInput source="hasSalary" defaultValue={false} />
      </SimpleForm>
    </Create>
  );
};
