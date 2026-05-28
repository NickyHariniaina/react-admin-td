import { BooleanInput, Create, NumberInput, required, SelectInput, SimpleForm, TextInput } from "react-admin"

export const EmployeeCreate= () => {
    return <Create>
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
    </Create>
}
