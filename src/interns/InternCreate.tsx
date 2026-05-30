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
        <TextInput source="prenom" validate={[required()]} />
        <ReferenceInput source="idManager" reference="employees">
          <SelectInput optionText="prenom" />
        </ReferenceInput>
        <NumberInput source="salaire" validate={[required()]} />
        <BooleanInput source="hasSalaire" defaultValue={false} />
      </SimpleForm>
    </Create>
  );
};
