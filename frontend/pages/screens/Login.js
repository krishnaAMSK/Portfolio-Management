import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Image from "next/image";
import Cookies from "universal-cookie";
import {toast} from "react-toastify";

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
    // e.preventDefault();

    // const credentials = { email, password };

    // const user = await axios.post("api/auth/login", credentials);
    // console.log(user);
    // if (user.data.success) {
    //   router.push("screens/secret");
    // }
    // else {
    //   router.push("/");
    // }
    e.preventDefault();
    try {
      const credentials = { email, password }
      const response = await axios.post("http://localhost:5000/login", credentials);
      console.log(response);

      if(response.data.success)
      {
        console.log('siging in with proper info ');
        console.log(response)
        const token = response.data.token;
        console.log('From Login Page')
        const user = response.data.user;
        const setup = await axios.post("../api/auth/login", {token,user});
        router.push("../screens/Home");
        return;
      }
      else
      {
        console.log(response.data.message);
        alert(response.data.message);
        router.push("/");
        return;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // const credentials = { email, password };

    // const user = await axios.post("api/auth/login", credentials);
    // console.log(user);
  };

  const handleLogOut = async () => {
    const user = await axios.get("api/auth/logout");
    console.log(user);
    router.push("/");
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = await axios.get("api/user");
      console.log(user);
      if (user.data.success) {
        router.push("screens/Home");
      }
    };
    checkUserAuthentication();
  }, []);

  return (
    <div className="bg-blue-100 font-sans">
      <div className="flex justify-center items-center h-screen">
        <div className={`w-1/2 bg-blue-100 transition-all duration-500 transform ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`} style={{ transitionProperty: 'transform' }}
>
          <div className="image-container flex items-center justify-center h-full transition-all duration-500 transform">
            <Image src="/port.png" alt="My Image" width={140} height={90}/>
          </div>
          <div className="text-black text-6xl font-bold font-serif flex items-center justify-center h-full">
          {isSignUp ? `Welcome!`:`Welcome back!`}
          </div>
          <div className="text-black text-3xl font-serif flex items-center justify-center h-full">
          {isSignUp ? `Create your own Portfolio here`:`Sign in to access your account`}
          </div>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone Number</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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