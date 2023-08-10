import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Add this line
import Link from "next/link";

const cookies = new Cookies();

export default function Login() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsSignUp((prevState) => !prevState);
    setUsername("");
    setEmail("");
    setContact("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password }
      console.log('start')
      const response = await axios.post("http://localhost:5000/login", credentials, { withCredentials: true });
      console.log('end')
      console.log(response);

      if (response.data.success) {
        console.log('siging in with proper info ');
        console.log(response)
        const token = response.data.token;
        console.log('From Login Page')
        const user = response.data.user;
        const setup = await axios.post("/api/auth/login", { token, user });
        router.push("/screens/Home");
        return;
      }
      else {
        console.log(response.data.message);
        toast.error(response.data.message); // Display error toast
        router.push("/");
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, email, password }
      const response = await axios.post("http://localhost:5000/register", credentials);
      console.log(response);

      if (response.data.success) {
        console.log('registered with proper info ');
        console.log(response)
        setIsSignUp(false);
        toast.success('Registration successful!'); // Display success toast
        return;
      }
      else {
        console.log(response.data.message);
        toast.error(response.data.message); // Display error toast
        return;
      }
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  const handleLogOut = async () => {
    const user = await axios.get("api/auth/logout");
    console.log(user);
    router.push("/");
  };

  const handleForgotPasswordClick = () => {
    router.push('/screens/ResetPassword');
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = await axios.get("/api/user");
      console.log(user);
      if (user.data.success) {
        router.push("/screens/Home");
      }
    };
    checkUserAuthentication();
  }, []);

  return (
    <div className="bg-blue-100 font-sans">
      <div className="flex justify-center items-center h-screen">
        <div className={`w-1/2 bg-blue-100 transition-all duration-500 transform ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`} style={{ transitionProperty: 'transform', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="image-container flex items-center justify-center h-full transition-all duration-500 transform">
            <Image src="/port.png" alt="My Image" width={140} height={90} />
          </div>
          <div className="text-black text-6xl font-bold font-serif flex items-center justify-center h-full">
            {isSignUp ? `Welcome!` : `Welcome back!`}
          </div>
          <div className="text-black text-3xl font-serif flex items-center justify-center h-full">
            {isSignUp ? `Create your own Portfolio here` : `Sign in to access your account`}
          </div>

          {!isSignUp && (
            <button
              onClick={handleForgotPasswordClick}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Forgot Password
            </button>
          )}
        </div>

        <div className={`w-1/2 transition-all duration-500 transform ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`} style={{ transitionProperty: 'transform' }}
        >
          {isSignUp ? (
            <form onSubmit={handleRegister} className="bg-white w-1/2 mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div> */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="font-sans flex w-full h-full">
                <div className="text-black text-base m-2">Already have an account?</div>
                <div>
                  <button
                    onClick={toggleForm}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleLogin}
              className="bg-white w-1/2 mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="font-sans flex w-full h-full">
                <div className="text-black text-base m-2">Don't have an account?</div>
                <div>
                  <button
                    onClick={toggleForm}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
