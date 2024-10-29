import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Define the validation schema outside the component to optimize rendering
const schema = yup.object({
  fname: yup.string().required("Please provide your first name."),
  lname: yup.string().required("Last name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  password: yup.string().required("Please enter your password"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const useRegisterForm = () => {
  return useForm({
    resolver: yupResolver(schema),
  });
};


const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return "An unknown error occurred. Please try again.";
};

const Register = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useRegisterForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/register",
        data
      );
      navigate("/login");
      console.log(response);
    } catch (error) {
      setServerError(handleApiError(error));
      console.error(error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-sky-900 text-white">
      <p>Register</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <label className="flex flex-col gap-1">
          <span>First Name:</span>
          <input className="outline rounded-md p-2 text-black" {...register("fname")} />
          <p className="text-red-500">{errors.fname?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span>Last Name:</span>
          <input className="outline rounded-md p-2 text-black" {...register("lname")} />
          <p className="text-red-500">{errors.lname?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span>Email:</span>
          <input className="outline rounded-md p-2 text-black" {...register("email")} />
          <p className="text-red-500">{errors.email?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span>Password:</span>
          <input type="password" className="outline rounded-md p-2 text-black" {...register("password")} />
          <p className="text-red-500">{errors.password?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span>Confirm Password:</span>
          <input type="password" className="outline rounded-md p-2 text-black" {...register("password_confirmation")} />
          <p className="text-red-500">{errors.password_confirmation?.message ?? ""}</p>
        </label>

        <button className="border-2 p-2 rounded-md bg-sky-700 hover:bg-blue-600 hover:scale-105 transition-all" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
