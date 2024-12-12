import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { RiArrowDropUpLine } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
// Navbar component definition
const Navbar = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [showMenu, setShowMenu] = useState(false); // State for managing menu visibility (not used here)
    const {token,setToken,userData} = useContext(AppContext)

    const logoutHandle = ()=>{
        setToken("");
        localStorage.removeItem('token')
    }
  return (
    // Main container for the navigation bar
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 ">
      {/* Logo that navigates to the homepage on click */}

      <img
        onClick={() => {
          navigate("/");
        }}
        src={assets.logo}
        className="w-44 cursor-pointer pr-2"
      />

      {/* Navigation links, visible only on medium-sized screens and above */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        {/* Home link */}
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {/* All Doctors link */}
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {/* About link */}
        <NavLink to={"/About"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {/* Contact link */}
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* User authentication section */}
      <div className="flex items-center gap-4 ">
        { token &&  userData ? (
          // When the user is logged in
          <div className="flex items-center cursor-pointer group relative ">
            {/* Profile picture and dropdown icon */}
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            {/* <img  className="w-2.5 group-hover:rotate-180 transition-all duration-300" src={assets.dropdown_icon} alt="" /> */}
            <RiArrowDropUpLine className="w-8 h-10 group-hover:rotate-180 transition-all duration-300 opacity-60" />

            {/* Dropdown menu that appears on hover */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                {/* Navigate to My Profile page */}
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                {/* Navigate to My Appointments page */}
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                {/* Logout and update the token state */}
                <p
              onClick={() => logoutHandle()}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // When the user is not logged in, show the "Create Account" button
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light md:ml-10 md:h-14"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* ---------Mpbile menu-------------- */}

        <div
          className={`${
            showMenu ? "fixed w-full " : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0  z-20 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex justify-between items-center px-5 py-6 ">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-8"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center font-medium ml-5">
            {/* Home link */}
            <NavLink
              to={"/"}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-2 rounded inline-block"
                  : "px-4 py-2 rounded inline-block"
              }
            >
              <li>
                <p>HOME</p>
              </li>
            </NavLink>
            {/* All Doctors link */}
            <NavLink
              to={"/doctors"}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-2 rounded inline-block"
                  : "px-4 py-2 rounded inline-block"
              }
            >
              <li>
                <p>ALL DOCTORS</p>
              </li>
            </NavLink>
            {/* About link */}
            <NavLink
              to={"/About"}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-2 rounded inline-block"
                  : "px-4 py-2 rounded inline-block"
              }
            >
              <li>
                <p>ABOUT</p>
              </li>
            </NavLink>
            {/* Contact link */}
            <NavLink
              to={"/contact"}
              onClick={() => setShowMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-4 py-2 rounded inline-block"
                  : "px-4 py-2 rounded inline-block"
              }
            >
              <li>
                <p>CONTACT</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
