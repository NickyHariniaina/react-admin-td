import {
  BooleanField,
  useGetOne,
  useRecordContext,
} from "react-admin";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const ManagerCard = () => {
  const intern = useRecordContext();

  const { data: manager, isPending, error } = useGetOne(
    "employees",
    { id: intern?.idManager },
    { enabled: !!intern?.idManager },
  );

  if (!intern) return null;

  if (isPending) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography color="textSecondary">
            Chargement du manager...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography color="error">
            Erreur de chargement du manager
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!manager) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {manager.firstname}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {manager.department}
        </Typography>
        <Typography
          variant="body2"
          component="a"
          href={`mailto:${manager.email}`}
          sx={{ display: "block", mb: 1 }}
        >
          {manager.email}
        </Typography>
        <BooleanField
          source="isActive"
          record={manager}
          label="Statut"
        />
      </CardContent>
    </Card>
  );
};
