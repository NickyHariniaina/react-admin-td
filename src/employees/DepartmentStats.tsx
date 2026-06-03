import { useGetList, useRecordContext } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isPending } = useGetList("employees", {
    filter: { department: employee?.department, isActive: true },
    pagination: { page: 1, perPage: 1 },
  });

  if (!employee) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Département {employee.department}
        </Typography>
        <Typography variant="body1">
          {isPending ? "..." : (total ?? 0)} collègue(s) actif(s)
        </Typography>
      </CardContent>
    </Card>
  );
};
