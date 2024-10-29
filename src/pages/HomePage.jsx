import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className=" w-[80%] mx-auto flex flex-col justify-between py-2 mt-8 p-8 shadow-md ">
      <p>FirstName :{user.fname || "user is not login"}</p>
      <p>LastName :{user.lname}</p>
      <p>Email :{user.email}</p>
    </div>
  );
};

export default Home;
