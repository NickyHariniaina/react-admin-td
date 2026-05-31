import {
  BooleanField,
  CreateButton,
  DataTable,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  SearchInput,
  SelectInput,
  TextField,
  TopToolbar,
} from "react-admin";
import { CustomPagination } from "./CustomPagination";
import { QuickStatusToggle } from "./QuickStatusToggle";

const employeeFilters = [
  <SearchInput
    key="q"
    source="q"
    alwaysOn
    placeholder="john doe / informatique / 1"
  />,
  <SelectInput
    key="q"
    source="department"
    choices={[
      { id: "informatique", name: "Informatique" },
      { id: "marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
    ]}
  />,
];

const ListActions = () => {
  return (
    <TopToolbar>
      <CreateButton />
    </TopToolbar>
  );
};

export const EmployeeList = () => {
  return (
    <List
      filters={employeeFilters}
      pagination={<CustomPagination />}
      actions={<ListActions />}
    >
      <DataTable rowClick="show">
        <DataTable.Col source="firstname">
          <TextField source="firstname" />
        </DataTable.Col>
        <DataTable.Col source="email">
          <TextField source="email" />
        </DataTable.Col>
        <DataTable.Col source="department">
          <TextField source="department" />
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
        <DataTable.Col source="isActive">
          <BooleanField source="isActive" />
        </DataTable.Col>
        <DataTable.Col label="Actions">
          <QuickStatusToggle />
        </DataTable.Col>
        <DataTable.Col>
          <EditButton />
          <DeleteButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};
