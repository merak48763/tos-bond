import {
  createHashRouter as createRouter,
  RouterProvider
} from "react-router-dom";
import ThemeProvider from "./theme/provider";
import CheckupProvider from "./util/checkup";
import Root from "./routes/root";
import AbilityFilter from "./routes/byAbility";
import ConditionFilter from "./routes/byCondition";
import ErrorPage from "./routes/error";

import "@fontsource/roboto";

const router = createRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
    <ThemeProvider>
      <CheckupProvider>
        <RouterProvider router={router} />
      </CheckupProvider>
    </ThemeProvider>
  );
}

export default App;
