import { useGetList, useRecordContext } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const formatSalary = (salary: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(salary);

export const InternsByManager = () => {
  const employee = useRecordContext();

  const {
    data: interns,
    total,
    isPending,
  } = useGetList("interns", {
    filter: { idManager: employee?.id },
  });

  if (!employee) return null;

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stagiaires encadrés ({total ?? 0})
        </Typography>

        {isPending && (
          <Typography color="textSecondary">Chargement...</Typography>
        )}

        {!isPending && (!interns || interns.length === 0) && (
          <Typography color="textSecondary">Aucun stagiaire encadré</Typography>
        )}

        {!isPending &&
          interns?.map((intern) => (
            <div key={intern.id}>
              <Link to={`/interns/${intern.id}/show`}>
                {intern.prenom} {intern.nom}
              </Link>
              <Typography variant="body2" color="textSecondary">
                {intern.department} — {formatSalary(intern.salary)}
              </Typography>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};
