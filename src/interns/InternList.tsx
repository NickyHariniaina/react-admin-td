import { useState } from "react";
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
  useCreate,
  useGetList,
  useListContext,
} from "react-admin";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField as MuiTextField,
} from "@mui/material";
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

const QuickCreateButton = () => {
  const [open, setOpen] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [idManager, setIdManager] = useState("");
  const { refetch } = useListContext();

  const { data: employees } = useGetList("employees", {
    filter: { isActive: true },
  });
  const [create, { isPending, error }] = useCreate();

  const handleSubmit = () => {
    create(
      "interns",
      {
        data: {
          prenom,
          nom,
          email: "",
          department: "",
          salary: 0,
          hasSalary: false,
          idManager: parseInt(idManager, 10),
        },
      },
      {
        onSuccess: () => {
          refetch();
          setOpen(false);
          setPrenom("");
          setNom("");
          setIdManager("");
        },
      },
    );
  };

  const handleClose = () => {
    setOpen(false);
    setPrenom("");
    setNom("");
    setIdManager("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Ajouter stagiaire rapide</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Ajouter un stagiaire</DialogTitle>
        <DialogContent>
          <MuiTextField
            autoFocus
            fullWidth
            label="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          <MuiTextField
            fullWidth
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            sx={{ mb: 2 }}
          />
          <MuiTextField
            fullWidth
            select
            label="Manager"
            value={idManager}
            onChange={(e) => setIdManager(e.target.value)}
          >
            {employees?.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.firstname}
              </MenuItem>
            ))}
          </MuiTextField>
          {error && (
            <p style={{ color: "red", marginTop: 8 }}>
              Erreur lors de la création
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !prenom || !nom || !idManager}
            variant="contained"
          >
            {isPending ? "Création..." : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ListActions = () => (
  <TopToolbar>
    <QuickCreateButton />
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
