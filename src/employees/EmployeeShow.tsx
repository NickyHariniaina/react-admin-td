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

export const EmployeeShow = () => {
  return (
    <Show actions={<ShowActions />}>
      <SimpleShowLayout>
        <TextField source="firstname" />
        <TextField source="email" />
        <TextField source="department" />
        <NumberField
          source="salary"
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="isActive" />
      </SimpleShowLayout>
    </Show>
  );
};
