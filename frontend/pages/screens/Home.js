import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

function Home() {
  // const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get("../api/user");
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    checkUserAuthentication();
  }, []);
  console.log(user)
  return (
    <div>
      <Header/>
      <div className="font-mono flex w-full h-full">
        <div className="flex flex-col mt-32 ml-64">
          <div>
            <Image
              src="/man.png"
              alt="Profile picture"
              className="rounded-full border-2 border-white"
              width={200}
              height={200}
            />
          </div>
          <div className="mt-8 ml-20">{user?`${user.name}`: "Welcome"}</div>
          <div className="ml-12">{user?"": "Web Developer"}</div>
        </div>
        <div className="w-96 h-32 m-40">
          {user ?
          `Hello, my name is ${user.name}, and I'm a web developer with a passion for
          creating seamless online experiences. With 2 years of experience in
          web development, I specialize in building user-friendly websites and
          web applications using modern technologies such as ReactJS, NextJS, and
          NodeJS.`: 
          "Login for full access"}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
