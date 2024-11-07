import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../store/slicer/authSlice";

const schema = yup.object({
  fname: yup.string().required("Please provide your first name."),
  lname: yup.string().required("Last name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  DOB: yup.date().nullable(),
});

const EditUserInfo = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user.user_id);
  console.log(userId);
  console.log(token);
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
    if (data.dob) {
      data.dob = new Date(data.dob).toISOString().split("T")[0];
    }
    console.log(data);
    try {
      const response = await axios.put(
        `http://192.168.68.117:8000/api/user/profile/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(editUser(response));
      navigate("/dashboard");
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-sky-900 text-white">
      <p>Edit User Info</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label className="flex flex-col gap-1">
          <span>First Name:</span>
          <input
            className="outline rounded-md p-2 text-black"
            {...register("fname")}
          />
          <p>{errors.fname?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Last Name:</span>
          <input
            className="outline rounded-md p-2 text-black"
            {...register("lname")}
          />
          <p>{errors.lname?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Email:</span>
          <input
            className="outline rounded-md p-2 text-black"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>DOB</span>
          <input
            type="date"
            className="outline rounded-md p-2 text-black"
            {...register("dob")}
          />
          <p>{errors.DOB?.message}</p>
        </label>

        <button
          className="border-2  p-2 rounded-md bg-sky-700 hover:bg-blue-600 hover:scale-105 transition-all"
          type="submit"
        >
          Save Edit
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
