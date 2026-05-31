import {
  BooleanField,
  EditButton,
  ListButton,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from "react-admin";

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => {
  return (
    <Show actions={<ShowActions />}>
      <SimpleShowLayout>
        <TextField source="firstname" />
        <NumberField source="idManager" />
        <NumberField
          source="salary"
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="hasSalary" />
      </SimpleShowLayout>
    </Show>
  );
};
