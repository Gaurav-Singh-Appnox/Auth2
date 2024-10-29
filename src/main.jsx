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
import ResetPassword from "./pages/ResetPassword.jsx";

// const googleClientId =
//   "926740365354-s6tnvgu9cd79f8d9v9rvs7krnm8d0qir.apps.googleusercontent.com";

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
        path: "/resetPassword",
        element: <ResetPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
