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
  return <span>Modifier : {record.firstname}</span>;
};

export const InternEdit = () => {
  return (
    <Edit title={<InternTitle />}>
      <SimpleForm>
        <TextInput source="firstname" validate={[required()]} />
        <ReferenceInput source="idManager" reference="employees">
          <SelectInput optionText="firstname" />
        </ReferenceInput>
        <NumberInput source="salary" validate={[required()]} />
        <BooleanInput source="hasSalary" defaultValue={false} />
      </SimpleForm>
    </Edit>
  );
};
