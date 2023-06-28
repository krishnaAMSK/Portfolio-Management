import Footer from "./Footer";
import Header from "./Header";
import Image from "next/image";

function Home() {
  return (
    <div>
      <Header></Header>
      <div class="font-mono flex w-full h-full">
        <div class="flex flex-col mt-32 ml-64">
          <div>
            <Image
              src="/man.png"
              alt="Profile picture"
              class=" rounded-full border-2 border-white"
              width={200}
              height={200}
            />
          </div>
          <div class="mt-8 ml-20">Mr.X</div>
          <div class="ml-12">Web Developer</div>
        </div>
        <div class="w-96 h-32 m-40   ">
          "Hello, my name is Mr.X, and I'm a web developer with a passion for
          creating seamless online experiences. With 2 years of experience in
          web development, I specialize in building user-friendly websites and
          web applications using modern technologies such as ReactJS, NextJS and
          NodeJS"
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
