import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const AllAppointment = () => {
  const { aToken, getAllAppointments, appointments,cancelAppointment  } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency} = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg  font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p className="ml-3">Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b hover:bg-gray-200"
            key={index}
          >
            <p className="max-sm:hidden ">{index + 1}</p>
            <div className="flex items-center gap-2 ">
              <img className="w-8 rounded-full " src={item.user.image}></img>{" "}
              <p>{item.user.name}</p>
            </div>
            <p /*className='max-sm : hidden' */>
              {calculateAge(item.user.dob)}
            </p>
            <p>
              {slotDateFormat(item.slotDate)} , {item.slotTime}
            </p>
            <div className="flex items-center gap-2 ">
              <img
                className="w-8 rounded-full bg-gray-200"
                src={item.doctor.image}
              ></img>{" "}
              <p>{item.doctor.name}</p>
            </div>
            <p>
              {currency}
              {item.doctor.fees}
            </p>
            {item.cancelled ? (
              <p className="text-red-300">Cancelled</p>
            ) : (
              <img
              onClick={()=>{cancelAppointment(item._id)}}
                className = "w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointment;
