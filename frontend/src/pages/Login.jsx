import React, { useContext, useEffect, useState } from "react"; // Update the import path if necessary
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoodle,
} from "./firbase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/authContext";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { backendUrl, token, setToken } = useContext(AppContext);
  const [isSigningIn, setIsSigningIn] = useState(false);
  
   const navigate = useNavigate()
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithGoogle();
      } catch (err) {
        toast.error("Google Sign-In failed. Please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // if (isSigningIn) return;

    // setIsSigningIn(true);

    try {
      const endpoint = state === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const requestData = state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, requestData);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(`${state === "Sign Up" ? "Account created" : "Logged in"} successfully`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };
 
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 mt-12">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={onSubmitHandler}
      >
        <div className="mb-6 text-center">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p className="text-gray-500 mt-1">
            {state === "Sign Up"
              ? "Please sign up to book an appointment"
              : "Log in to continue"}
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={isSigningIn}
        >
          {isSigningIn ? "Please wait..." : state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full bg-red-500 text-white py-2 rounded mt-3 hover:bg-red-600 transition-colors"
            disabled={isSigningIn}
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-500">
            {state === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              type="button"
              className="text-blue-500 hover:underline ml-1"
              onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            >
              {state === "Sign Up" ? "Login here" : "Sign up here"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
