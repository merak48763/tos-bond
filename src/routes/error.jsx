import { useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Box sx={{p: 2}}>
      <Typography variant="h4" component="div" sx={{mb: 1}}>發生錯誤</Typography>
      <Typography>{error?.statusText ?? error?.message ?? "未知的錯誤"}</Typography>
    </Box>
  );
}

export default ErrorPage;
