import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const DashBoard = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="w-[80%] mx-auto mt-12">
      {token && (
        <div className="flex flex-col gap-4 p-4 bg-sky-300 rounded-md shadow-lg">
          <p>FirstName : {user.fname}</p>
          <p>LastName : {user.lname}</p>
          <p>Email : {user.email}</p>
          <div className="flex gap-4">
            <div>
              <NavLink
                className="py-2 px-4 bg-sky-200 rounded-md"
                to={"/editUser"}
              >
                Edit user
              </NavLink>
            </div>
            <div>
              
              <NavLink
                className="py-2 px-4 bg-sky-200 rounded-md"
                to={"/changePassword"}
              >
                Change Password
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
