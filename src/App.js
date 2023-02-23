import {
  createHashRouter as createRouter,
  RouterProvider
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Root from "./routes/root";
import AbilityFilter from "./routes/byAbility";
import ConditionFilter from "./routes/byCondition";

import "@fontsource/roboto";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});
const router = createRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "ability",
        element: <AbilityFilter />
      },
      {
        path: "condition",
        element: <ConditionFilter />
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;