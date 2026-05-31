import {
  BooleanInput,
  Create,
  FormDataConsumer,
  NumberInput,
  ReferenceInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const validateEmail = regex(
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  "Format d'email invalide",
);

const validateSalary = (value: number | null | undefined, values: any) => {
  if (values?.hasSalary && (!value || value <= 0)) {
    return "Le salaire est obligatoire si rémunéré";
  }
  return undefined;
};

export const InternCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="prenom" validate={[required()]} />
      <TextInput source="nom" validate={[required()]} />
      <TextInput
        source="email"
        validate={[required(), validateEmail]}
      />
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
            <SelectInput
              optionText="firstname"
              label="Manager"
              validate={[required()]}
            />
          </ReferenceInput>
        )}
      </FormDataConsumer>
      <NumberInput source="salary" validate={[validateSalary]} />
      <BooleanInput source="hasSalary" defaultValue={false} />
    </SimpleForm>
  </Create>
);
