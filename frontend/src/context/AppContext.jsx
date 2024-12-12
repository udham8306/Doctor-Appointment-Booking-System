import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || "";
    } catch {
      return "";
    }
  });
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
 

  const loadUserProfileData = async () => {
    if (!token) return; // Avoid request if no token
    
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token},
      });
  
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading user profile data:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const value = {
    doctors, getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
