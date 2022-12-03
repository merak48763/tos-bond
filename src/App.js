import {
  createHashRouter as createRouter,
  RouterProvider
} from "react-router-dom";
import Filter, { loader as filterLoader } from "./routes/filter";
import Result, { loader as resultLoader } from "./routes/result";

import "@fontsource/roboto";

const router = createRouter([
  {
    path: "/",
    element: <Filter />,
    loader: filterLoader,
    id: "root",
    children: [
      {
        path: ":query",
        element: <Result />,
        loader: resultLoader
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