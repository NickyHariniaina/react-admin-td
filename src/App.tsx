import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit}/>
  </Admin>
);

//// Github: mbomain / Gmail:
