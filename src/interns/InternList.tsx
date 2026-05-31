import {
  BooleanField,
  CreateButton,
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SearchInput,
  SelectInput,
  TextField,
  TopToolbar,
} from "react-admin";
import { CustomPagination } from "./CustomPagination";

const internFilters = [
  <SearchInput key="q" source="q" alwaysOn placeholder="prénom / nom" />,
  <SelectInput
    key="department"
    source="department"
    label="Département"
    choices={[
      { id: "informatique", name: "Informatique" },
      { id: "marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
    ]}
    alwaysOn
  />,
  <SelectInput
    key="hasSalary"
    source="hasSalary"
    label="Rémunéré"
    choices={[
      { id: true, name: "Rémunéré" },
      { id: false, name: "Non rémunéré" },
    ]}
  />,
];

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const InternList = () => (
  <List
    filters={internFilters}
    pagination={<CustomPagination />}
    actions={<ListActions />}
  >
    <Datagrid rowClick="show">
      <FunctionField
        label="Stagiaire"
        render={(record: any) => `${record.prenom} ${record.nom}`}
      />
      <TextField source="email" />
      <TextField source="department" />
      <ReferenceField source="idManager" reference="employees" label="Manager">
        <TextField source="firstname" />
      </ReferenceField>
      <NumberField
        source="salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="hasSalary" label="Rémunéré" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
