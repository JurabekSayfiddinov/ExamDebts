import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";


import DashboardLayout from "./layout/DashboardLayout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Debts from "./components/Debts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/debts",
        element: <Debts />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;