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

const employeeFilters = [
    <SearchInput source="q" alwaysOn placeholder="john doe / informatique / 1" />,
    <SelectInput source="departement" choices={[
        {id: "informatique", name: 'Informatique'},
        {id: "marketing", name: 'Marketing'},
        {id: "RH", name: 'RH'},
    ]} />
]

const ListActions = () => {
    return <TopToolbar>
        <CreateButton />
    </TopToolbar>
}

export const EmployeeList = () => {
    return <List filters={employeeFilters} pagination={<CustomPagination />} actions={<ListActions />}>
        <DataTable rowClick="edit">
            <DataTable.Col source="prenom">
                <TextField source="prenom" />
            </DataTable.Col>
            <DataTable.Col source="email">
                <TextField source="email" />
            </DataTable.Col>
            <DataTable.Col source="departement">
                <TextField source="departement" />
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
            <DataTable.Col source="actif">
                <BooleanField source="actif" />
            </DataTable.Col>
            <DataTable.Col>
                <EditButton />
                <DeleteButton />
            </DataTable.Col>
        </DataTable>
    </List>
};
