import {
    BooleanField,
    EditButton,
    ListButton,
    NumberField,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
} from "react-admin"

const ShowActions = () => (
    <TopToolbar>
        <ListButton />
        <EditButton />
    </TopToolbar>
)

export const EmployeeShow = () => {
    return <Show actions={<ShowActions />}>
        <SimpleShowLayout>
            <TextField source="prenom" />
            <TextField source="email" />
            <TextField source="departement" />
            <NumberField
                source="salaire"
                options={{ style: "currency", currency: "EUR" }}
            />
            <BooleanField source="actif" />
        </SimpleShowLayout>
    </Show>
}
