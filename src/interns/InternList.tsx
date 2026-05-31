import {
  BooleanField,
  CreateButton,
  DataTable,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
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
    placeholder="john doe"
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
        <DataTable.Col source="firstname">
          <TextField source="firstname" />
        </DataTable.Col>
        <DataTable.Col source="idManager" label="Manager">
          <ReferenceField source="idManager" reference="employees">
            <TextField source="firstname" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="salary">
          <NumberField
            source="salary"
            options={{
              style: "currency",
              currency: "EUR",
            }}
          />
        </DataTable.Col>
        <DataTable.Col source="hasSalary">
          <BooleanField source="hasSalary" />
        </DataTable.Col>
        <DataTable.Col>
          <EditButton />
          <DeleteButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};
