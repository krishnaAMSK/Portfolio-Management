import Header from "../components/Header";
import Footer from "../components/Footer";
import Intro from "../components/About";
import Contact from "../components/Contact"

function About() {
  return (
    <div>
      <Header></Header>
      <Intro></Intro>
      <div class=" h-64 font-mono text-xl m-32 p-8 space-x-4">
        <h1 class=" text-6xl text-center font-bold">ABOUT MYSELF</h1>
        <p class="text-base">
          Hello, my name is Mr.X, and I'm a web developer with a passion for
          creating seamless online experiences. With 2 years of experience in
          web development, I specialize in building user-friendly websites and
          web applications using modern technologies such as HTML, CSS, and
          JavaScript, ReactJS, NextJS, TailwindCSS, NodeJS, ExpressJS. I have a
          strong foundation in front-end development, including frameworks like
          React, and I'm also proficient in back-end technologies like Node.js.
          I enjoy collaborating with cross-functional teams to bring innovative
          ideas to life and deliver high-quality code. I stay up-to-date with
          industry trends and best practices to ensure that I'm always
          implementing the latest techniques and technologies in my work. I'm
          excited to leverage my skills and experience to contribute to your
          team and create impactful digital solutions.
        </p>
      </div>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
}

// function Project(){
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-blue-500">
//                 <h2 className="text-xl text-center font-semibold text-gray-100 mb-4">
//                   First project
//                 </h2>
//                 <p className="text-gray-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut consequat semper viverra nam libero justo laoreet sit amet. Egestas dui id ornare arcu odio ut sem nulla. Cras ornare arcu dui vivamus arcu felis bibendum. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Nunc eget lorem dolor sed viverra ipsum nunc. Convallis tellus id interdum velit laoreet id donec. Morbi quis commodo odio aenean sed adipiscing diam donec. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Cursus eget nunc scelerisque viverra mauris in.</p>
//                 <a
//                   href="https://www.google.com"
//                   className="text-blue-500 hover:text-blue-300 font-medium"
//                 >
//                   View Source
//                 </a>
//               </div>
//           </div>
//   )
// }

export default About;
