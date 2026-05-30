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
        <TextField source="prenom" />
        <NumberField source="idManager" />
        <NumberField
          source="salaire"
          options={{ style: "currency", currency: "EUR" }}
        />
        <BooleanField source="hasSalaire" />
      </SimpleShowLayout>
    </Show>
  );
};
