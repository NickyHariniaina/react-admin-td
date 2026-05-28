import { BooleanInput, Edit, NumberInput, required, SelectInput, SimpleForm, TextInput, useRecordContext } from "react-admin"

const EmployeeTitle = () => {
    const record = useRecordContext()
    if (!record) return null
    return <span>Modifier : {record.prenom}</span>
}

export const EmployeeEdit = () => {
    return <Edit title={<EmployeeTitle />}>
        <SimpleForm>
            <TextInput source="prenom" validate={[required()]}/>
            <TextInput source='email' validate={[required()]} />
            <SelectInput source='departement' validate={[required()]} choices={[
                {id: 'informatique', name: 'Informatique'},
                {id: 'marketing', name: "Marketing"},
                {id: 'RH', name: 'RH'}
            ]}/>
            <NumberInput source='salaire' validate={[required()]} min='1500' />
            <BooleanInput source='actif' defaultValue={true}/>
        </SimpleForm>
    </Edit>
}
