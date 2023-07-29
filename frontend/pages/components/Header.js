import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const router = useRouter();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get("/api/user");
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    checkUserAuthentication();
  }, []);

  const handleLogOut = async () => {
    const user = await axios.get("/api/auth/logout");
    console.log(user);
    router.push("/");
  };

  return (
    <div className="shadow-md font-mono bg-blue-300 w-full h-24">
      <div className="p-4">
        <Link href={`/screens/Home`}>
          <Image src="/port.png" alt="My Image" width={140} height={90} />
        </Link>
      </div>
      <div className="font-mono text-xl text-black p-8 flex flex-row space-x-4 top-right-div absolute top-0 right-0">
        <div ref={dropdownRef} className="relative z-10">
          <button
            onClick={handleToggleDropdown}
          >
            Post
          </button>
          {showDropdown && (
            <div className="absolute top-14 right-0 bg-white shadow-md">
              <Link href={`/screens/Post/Create`}>
                <button className="block w-full text-left py-2 px-4 hover:bg-gray-100">
                  Create
                </button>
              </Link>
              <Link href={`/screens/Post/Display`}>
                <button className="block w-full text-left py-2 px-4 hover:bg-gray-100">
                  View
                </button>
              </Link>
            </div>
          )}
        </div>
        <Link href={`/screens/Search`}>Search</Link>
        <Link href={`/screens/Project`}>Projects</Link>
        <Link href={`/screens/Profile`}>Profile</Link>
        <button
          onClick={handleLogOut}
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
