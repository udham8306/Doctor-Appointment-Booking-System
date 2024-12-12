import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/list-appointments`,
        { headers: { token } } // Use Bearer token for security
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to cancel appointment");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment-Payment",
      description: "Appointment-payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (res) => {
        console.log(res);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            res,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    doctors && (
      <div>
        <p className="pb-3 font-medium text-zinc-700 border-b">
          My Appointments
        </p>
        <div className="space-y-6">
          {appointments.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.doctor.image}
                  alt="Doctor"
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.doctor.name}
                </p>
                <p>{item.doctor.speciality}</p>
                <p className="text-zinc-700 font-semibold">Address:</p>
                <p className="text-xs">{item.doctor.address.line1}</p>
                <p className="text-xs">{item.doctor.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date Time:{" "}
                  </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col justify-end gap-5">
                {item.cancelled ? (
                  <p className="text-sm text-red-600">
                    Appointment is cancelled
                  </p>
                ) : (
                  <>
                    {item.payment ? (
                      <button className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded-lg bg-green-500 text-white">
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          appointmentRazorpay(item._id);
                        }}
                        className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Pay Online
                      </button>
                    )}
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-sm text-stone-600 text-center sm:min-w-48 py-2 border rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MyAppointments;
