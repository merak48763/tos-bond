import {
  createHashRouter as createRouter,
  RouterProvider
} from "react-router-dom";
import Root from "./routes/root";

import "@fontsource/roboto";

const router = createRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "ability",
        element: <div>ability</div>
      },
      {
        path: "condition",
        element: <div>condition</div>
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;