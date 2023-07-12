import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import axios from "axios";

function Header() {
  const { user, setUser } = useUser();
  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (userData !== undefined && userData !== null) {
  //     const parsedUser = JSON.parse(userData);
  //     setUser(parsedUser);
  //   }
  // }, [setUser]);
  
  const router = useRouter();
  const handleLogOut = async () => {
    const user = await axios.get("../api/auth/logout");
    console.log(user);
    router.push("/");
  };
  
  // console.log(user);
  
  return (
    <div class="shadow-md font-mono bg-blue-300 w-full h-24">
      <div class="p-4">
        <Link href="/">
          <Image src="/port.png" alt="My Image" width={140} height={90} />
        </Link>
      </div>
      <div class=" font-mono text-xl text-black p-8 flex flex-row space-x-4 top-right-div absolute top-0 right-0">
      <button onClick={handleLogOut} className="bg-black hover:bg-slate-700 text-white py-1 px-4 rounded">
      Logout
      </button>
        <Link href="../screens/About">About</Link>
        <Link href="../screens/Project">Projects</Link>
        <Link href="../screens/Profile">Profile</Link>
      </div>
    </div>
  );
}
export default Header;
