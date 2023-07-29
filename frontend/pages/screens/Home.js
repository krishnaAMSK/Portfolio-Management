import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from 'react-bootstrap';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { useRouter } from "next/router";

const handleButtonClick = () => {
  window.open('http://google.com', '_blank');
};

function Home() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const getUser = async () => {
      let response;
      response = await axios.get("/api/user");
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };
    getUser(); 
  }, []);

  useEffect(() => {
    if (user) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/project/${user.email}`);
          setProjects(response.data.projects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
      fetchProjects();
    }
  }, [user]);

  return (
    <div>
      <Header />

      {/* Intro */}
      <div className="flex justify-center items-center h-screen">
        {/* Left Side */}
        <div className="text-center p-8">
          <img
            src="/man.png"
            alt="Profile picture"
            className="rounded-full border-2 border-white mb-4"
            width={200}
            height={200}
          />
          <h1 className="text-4xl font-bold mb-4">{user?.name}</h1>
          <button
            onClick={handleButtonClick}
            className="bg-transparent text-white hover:bg-white hover:text-black font-bold py-2 px-4 border border-white-700 active:bg-white mb-4"
          >
            Check my resume
          </button>
        </div>

        {/* Right Side */}
        <div className="p-8 flex flex-col justify-start items-start">
          <div className="text-center mb-4">
            <h1 className="text-5xl font-bold">ABOUT MYSELF</h1>
          </div>
          <div className="text-sm">
            {user?.about}
          </div>
        </div>
      </div>

      {/* Project */}
      <div id="section-2" className="About_me">
        <div className="content">
          <div className="my_name">Projects</div>
          <div className="wrapper">
            <div className="cards_wrap">
              {projects[0]?.projects.map((project) => (
                <div className="card_item p-4 rounded-md" key={project._id}>
                  <div className="card_inner">
                    <div className="role_name">{project.name}</div>
                    <div className="film">{project.description}</div>
                    <a href={project.source} className="real_name">GitHub Link</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="section-2" className="About_me">
        <div className="content">
          <div className="my_name">Skills</div>
          <div className="wrapper">
            <div className="cards_wrap">
              {user?.skills.map((skill) => (
                <div className="card_item p-4 rounded-md" key={skill}>
                  <div className="card_inner">
                    <div className="role_name">{skill}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="section-3" className="About_me">
        <div className="content">
          <div className="my_name text-center text-5xl">Reach me</div>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <GitHubIcon fontSize="large" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="mailto:yourmail@example.com">
              <EmailIcon fontSize="large" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
