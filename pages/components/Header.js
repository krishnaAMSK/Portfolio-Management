import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from "axios";

function Header() {
  // const { user, setUser } = useUser();
  const [selectedOption, setSelectedOption] = useState('');
  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };
  // useEffect(() => {
  //   const userData = localStorage.getItem("user");
  //   if (userData !== undefined && userData !== null) {
  //     const parsedUser = JSON.parse(userData);
  //     setUser(parsedUser);
  //   }
  // }, [setUser]);
  
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get('../../api/user');
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    checkUserAuthentication();
  }, []);
  const handleLogOut = async () => {
    const user = await axios.get("../api/auth/logout");
    console.log(user);
    router.push("/");
  };
  
  // console.log('seeing from header')
  // console.log(user.info);
  
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
        <Link href="../screens/Post/Create">Post</Link>
        <Link href={`../screens/Post/Display?email=${user?.email}`}>Display</Link>
        <Link href="../screens/Search">Search</Link>
        <Link href="../screens/Project">Projects</Link>
        <Link href="../screens/Profile">Profile</Link>
        {/* <div className="relative">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="border rounded bg-white px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Post
            </option>
            <option value="view"><Link href="../screens/Post/Create">Post</Link></option>
            <option value="create"><Link href="../screens/Post/Create">Post</Link></option>
            <option value="update"><Link href="../screens/Post/Create">Post</Link></option>
          </select>
        </div> */}
      </div>
    </div>
  );
}
export default Header;
