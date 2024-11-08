import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Home from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import DashBoard from "./pages/DashBoard.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import EditUserInfo from "./pages/EditUserInfo.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },

      {
        path: "/editUser",
        element: <EditUserInfo />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
