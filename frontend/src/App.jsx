import React from "react";
import { Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments"
import MyProfile from "./pages/MyProfile";
import ABout from "./pages/ABout";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/doctors" element={<Doctors />}></Route>
        <Route path="/doctors/:speciality" element={<Doctors />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<ABout />}></Route>
        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/my-profile" element={<MyProfile />}></Route>
        <Route path="/my-appointments" element={<MyAppointments/>}></Route>
        <Route
          path="/appointment/:docId"
          element={<Appointment />}
        ></Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
