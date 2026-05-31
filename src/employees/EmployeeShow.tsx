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
import { DepartmentStats } from "./DepartmentStats";
import { InternsByManager } from "./InternsByManager";

const ShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField source="firstname" />
      <TextField source="email" />
      <TextField source="department" />
      <NumberField
        source="salary"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="isActive" />
      <InternsByManager />
      <DepartmentStats />
    </SimpleShowLayout>
  </Show>
);
