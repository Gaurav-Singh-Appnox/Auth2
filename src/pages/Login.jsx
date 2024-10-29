import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setUser } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const schema = yup.object({
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Please enter your password"),
});

const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return "An unknown error occurred. Please try again.";
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/login",
        data
      );
      dispatch(setUser(response.data));
      navigate("/");
    } catch (error) {
      setLoginError(handleApiError(error));
      console.error(error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-sky-900 text-white">
      <p>Login</p>
      <div className="mt-2 h-[2px] bg-sky-950" />

      {loginError && <p className="text-red-500 mb-4">{loginError}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6 "
      >
        <label className="flex flex-col">
          <span className="mb-2">Email:</span>
          <input
            className="outline w-full p-2 rounded text-black"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </label>

        <label className="flex flex-col">
          <span className="mb-2">Password:</span>
          <input
            type="password"
            className="outline w-full p-2 rounded text-black"
            {...register("password")}
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </label>

        <button
          className="border-2 p-2 rounded bg-sky-600 hover:bg-blue-600 hover:scale-105 transition-all"
          type="submit"
        >
          Login
        </button>
        <NavLink to={"/forgotPassword"} className="text-yellow-500">
          Forgot Password
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
