import { useRecordContext, useUpdate } from "react-admin";
import { Button } from "@mui/material";

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update("employees", {
      id: record.id,
      data: { isActive: !record.isActive },
      previousData: record,
    });
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant="outlined"
      size="small"
      sx={{
        color: record.isActive ? "error.main" : "success.main",
        borderColor: record.isActive ? "error.main" : "success.main",
      }}
    >
      {record.isActive ? "Désactiver" : "Activer"}
    </Button>
  );
};
