import {
  BooleanField,
  CreateButton,
  DataTable,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  SearchInput,
  TextField,
  TopToolbar,
} from "react-admin";
import { CustomPagination } from "./CustomPagination";

const internFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="john doe / 1"
  />,
];

const ListActions = () => {
  return (
    <TopToolbar>
      <CreateButton />
    </TopToolbar>
  );
};

export const InternList = () => {
  return (
    <List
      filters={internFilters}
      pagination={<CustomPagination />}
      actions={<ListActions />}
    >
      <DataTable rowClick="show">
        <DataTable.Col source="prenom">
          <TextField source="prenom" />
        </DataTable.Col>
        <DataTable.Col source="idManager">
          <NumberField source="idManager" />
        </DataTable.Col>
        <DataTable.Col source="salaire">
          <NumberField
            source="salaire"
            options={{
              style: "currency",
              currency: "EUR",
            }}
          />
        </DataTable.Col>
        <DataTable.Col source="hasSalaire">
          <BooleanField source="hasSalaire" />
        </DataTable.Col>
        <DataTable.Col>
          <EditButton />
          <DeleteButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};
