import {
  createHashRouter as createRouter,
  RouterProvider
} from "react-router-dom";
import ThemeProvider from "./theme/provider";
import Root from "./routes/root";
import AbilityFilter from "./routes/byAbility";
import ConditionFilter from "./routes/byCondition";

import "@fontsource/roboto";

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
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;