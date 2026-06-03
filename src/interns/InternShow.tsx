import {
  BooleanField,
  EditButton,
  ListButton,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { ManagerCard } from "./ManagerCard";

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

const ManagerLinkField = () => {
  const record = useRecordContext();
  if (!record) return null;
  return <Link to={`/employees/${record.id}/show`}>{record.firstname}</Link>;
};

export const InternShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField source="prenom" label="Prénom" />
      <TextField source="nom" label="Nom" />
      <TextField source="email" />
      <TextField source="department" />
      <ReferenceField source="idManager" reference="employees" label="Manager">
        <ManagerLinkField />
      </ReferenceField>
      <NumberField
        source="salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="hasSalary" label="Rémunéré" />
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
