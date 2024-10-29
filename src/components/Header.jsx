import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../store/slicer/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const isLogedIn = useSelector((state) => state.auth.token);
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const handleResetPassword =()=>{
   
  }
  return (
    <div className="w-full shadow-md bg-blue-950">
      <div className="w-[80%] mx-auto flex justify-between py-3 items-center">
        <NavLink to={"/"} className="font-bold text-lg text-white">
          Logo
        </NavLink>
        {isLogedIn ? (
          <div className="relative">
            <FaUserCircle
              className="cursor-pointer text-white size-8"
              onClick={() => setMenu(!menu)} 
            />
            {menu && (
              <div className={`absolute flex-col gap-4 p-4 top-12 rounded-md right-0 bg-slate-400 ${menu ? 'flex' :''}`}>
                <NavLink to={'/dashboard'} onClick={() => setMenu(!menu)} className="text-white ">
                  Dashboard
                </NavLink>
                <NavLink className="text-red-700  " onClick={handleLogOut}>
                  Log Out
                </NavLink>
                <NavLink className="text-red-700  " onClick={handleResetPassword}>
                  Reset Password
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <NavLink
              to={"/login"}
              className="py-2 px-4 text-white shadow-md rounded-md hover:bg-blue-800 hover:scale-105 transition-all"
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              className="py-2 px-4 shadow-md text-white rounded-md hover:bg-blue-800 hover:scale-105 transition-all"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
