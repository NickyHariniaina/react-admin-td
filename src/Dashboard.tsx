import { useGetList } from "react-admin";
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const StatCard = ({
  title,
  total,
  isPending,
}: {
  title: string;
  total?: number;
  isPending: boolean;
}) => (
  <Card sx={{ textAlign: "center", py: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        {isPending ? "..." : total ?? 0}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees, isPending: pendingEmp } = useGetList(
    "employees",
    { pagination: { page: 1, perPage: 1 } },
  );

  const { total: activeEmployees, isPending: pendingActive } = useGetList(
    "employees",
    { pagination: { page: 1, perPage: 1 }, filter: { isActive: true } },
  );

  const { total: totalInterns, isPending: pendingInt } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: paidInterns, isPending: pendingPaid } = useGetList("interns", {
    pagination: { page: 1, perPage: 1 },
    filter: { hasSalary: true },
  });

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total employés" total={totalEmployees} isPending={pendingEmp} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Employés actifs" total={activeEmployees} isPending={pendingActive} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Total stagiaires" total={totalInterns} isPending={pendingInt} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard title="Stagiaires rémunérés" total={paidInterns} isPending={pendingPaid} />
      </Grid>
    </Grid>
  );
};
