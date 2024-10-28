import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = yup.object({
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        "http://192.168.68.117:8000/api/register",
        data
      );
      console.log(response);
      dispatch(login(response));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-slate-300">
      <p>Login</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label className="flex flex-col">
          <span className="mb-2">Email:</span>
          <input
            className="outline w-full p-2 rounded"
            {...register("email")}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Password:</span>
          <input
            className="outline w-full p-2 rounded"
            type="password"
            {...register("password")}
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </label>
        <input
          className="border-2 border-black p-2 rounded bg-blue-400 hover:bg-blue-600 hover:scale-105 transition-all"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Login;
