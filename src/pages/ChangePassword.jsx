import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const schema = yup.object({
  old_password: yup.string().required("Please enter your password"),
  new_password: yup.string().required("Please enter your new password"),
  email: yup.string().email().required("Email is required."),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords must match")
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

const ChangePassword = () => {
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.token);
  console.log(userToken);
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(userToken);
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/user/update-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      navigate("/dashboard");
      console.log(response);
    } catch (error) {
      setServerError(handleApiError(error));
      console.error(error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-blue-950 text-white">
      <p>Change Password</p>
      <div className="mt-2 h-[2px] bg-gray-400" />

      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label className="flex flex-col">
          <span className="mb-2">Email:</span>
          <input
            className="outline w-full p-2 rounded text-black"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span> Old Password:</span>
          <input
            type="password"
            className="outline rounded-md p-2 text-black"
            {...register("old_password")}
          />
          <p className="text-red-500">{errors.old_password?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span> New Password:</span>
          <input
            type="new_password"
            className="outline rounded-md p-2 text-black"
            {...register("new_password")}
          />
          <p className="text-red-500">{errors.password?.message ?? ""}</p>
        </label>

        <label className="flex flex-col gap-1">
          <span>Confirm New Password:</span>
          <input
            type="password"
            className="outline rounded-md p-2 text-black"
            {...register("new_password_confirmation")}
          />
          <p className="text-red-500">
            {errors.new_password_confirmation?.message ?? ""}
          </p>
        </label>

        <button
          className="border-2 p-2 rounded-md bg-blue-500 hover:bg-blue-600 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
