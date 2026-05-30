import {
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";

const InternTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <span>Modifier : {record.prenom}</span>;
};

export const InternEdit = () => {
  return (
    <Edit title={<InternTitle />}>
      <SimpleForm>
        <TextInput source="prenom" validate={[required()]} />
        <ReferenceInput source="idManager" reference="employees">
          <SelectInput optionText="prenom" />
        </ReferenceInput>
        <NumberInput source="salaire" validate={[required()]} />
        <BooleanInput source="hasSalaire" defaultValue={false} />
      </SimpleForm>
    </Edit>
  );
};
