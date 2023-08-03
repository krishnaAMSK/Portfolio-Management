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
      <div id="section-1" class="About_me">
        <div class="content">
          <div class="my_name">
            About me
          </div>
          <div class="wrapper">
            <div class="cards-wrap">
              <div class="card_item">
                <div class="card-inner" style={{ float: 'left', width: '50%' }}>
                  {user?.about}
                </div>
                <div className="card-inner flex flex-col items-center" style={{ float: 'right' }}>
                  <img
                    src="/man.png"
                    alt="Profile picture"
                    className="rounded-full border-2 border-white mb-4"
                    width={200}
                    height={200}
                  />
                  <div style={{ margin: '10px' }}>
                    <button
                      onClick={handleButtonClick}
                      className="bg-transparent text-white hover:bg-white hover:text-black font-bold py-2 px-4 border border-white-700 active:bg-white mb-4"
                    >
                      Check my resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project */}
      <div id="section-2" class="About_me">
        <div class="content">
          <div class="my_name">
            Projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects[0]?.projects.map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-md p-6 border">
                <h2 className="projectName">
                  {project.name}
                </h2>
                <p className="projectDiscription">{project.description}</p>
                <a
                  href={project.source}
                  className="text-blue-500 hover:text-blue-300 font-medium"
                >
                  View Source
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* skills */}
      <div id="section-2" class="About_me">
        <div class="content">
          <div class="my_name">
            Skills
          </div>
          {user?.skills.map((skill) => (
            <div class="skillColumn">
              <div class="skillCard">
                <h3>{skill}</h3>
              </div>
            </div>
          ))}
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

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      // userTypes: ["admin"],
    },
  }
}

export default Home;
