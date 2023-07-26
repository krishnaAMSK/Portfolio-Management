import Header from "../components/Header";
import Footer from "../components/Footer";
import { dividerClasses } from "@mui/material";
import { Button } from 'react-bootstrap';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const handleButtonClick = () => {
  window.open('http://google.com', '_blank');
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  content: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  photo: {
    width: '250px',
    height: '275px',
    borderRadius: '20%',
    //boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Optional: add a shadow to the photo
    margin: 'auto',
    // width: '50%',
  },
};

function About() {

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get("../api/user");
      if (response.data.success) {
        setUser(JSON.parse(response.data.user));
      }
    };

    checkUserAuthentication();
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
      <Header></Header>

      {/* Intro */}
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.heading}>{user?.name}</h1>
          <img
            src="https://picsum.photos/id/64/200/300" // Replace 'john_photo_url' with the actual URL of John's photo
            alt="John Doe"
            style={styles.photo}
          />
          {/* <Button variant="primary">Check my resume</Button>  */}
          <button onClick={handleButtonClick} style={{ margin: '40px' }} className="bg-transparent text-white hover:bg-white hover:text-black font-bold py-2 px-4 border border-white-700 active:bg-white">
            Check my resume
          </button>
        </div>
        <div>

        </div>
      </div>

      {/* Content */}
      <div id="section-3" class="About_me">
        <div class="content">
          <div class="my_name">
            About Myself
          </div>
          <div>
            <p>
              {user?.about}
            </p>
          </div>
        </div>
      </div>

      {/* Project */}

      <div id="section-2" class="About_me">
        <div class="content">
          <div class="my_name">
            Projects
          </div>
          <div class="wrapper">
            <div class="cards_wrap">
              {projects[0]?.projects.map((project) => (
                <div class="card_item" key={project._id}>
                  <div class="card_inner">
                    <div class="role_name">{project.name}</div>
                    <div class="film">{project.description}</div>
                    <a href={project.source} class="real_name">GitHub Link</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="section-2" class="About_me">
        <div class="content">
          <div class="my_name">
            Skills
          </div>
          <div class="wrapper">
            <div class="cards_wrap">
              {user?.skills.map((skill) => (
                <div class="card_item">
                  <div class="card_inner">
                    <div class="role_name">{skill}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="section-3" class="About_me">
        <div class="content">
          <div class="my_name">
            Reach me
          </div>
          <div>
            {/* <div style={{ float: 'left' }} class="image">
              <Link href="https://linkedin.com/">
                <Image src="/images/linkedin.png" alt="My Image" width={100} height={100} />
              </Link>
            </div>
            <div style={{ float: 'left' }} class="image">
              <Link href="https://github.com/">
                <Image src="/images/instagram.png" alt="My Image" width={100} height={100} />
              </Link>
            </div>
            <div style={{ float: 'left' }} class="image">
              <Link href="https://github.com/">
                <Image src="/images/gmail.png" alt="My Image" width={100} height={100} />
              </Link>
            </div> */}
          </div>

          {/*             
            <Link href="https://linkedin.com/">
                <Image fill={true} src="/images/linkedin.png" alt="My Image"/>
            </Link>
            <Link href="mailto: yourmail@hotmail.com">
                <Image fill={true} src="/images/gmail.png" alt="My Image"/>
            </Link>
            <Link href="https://instagram.com/">
                <Image fill={true} src="/images/instagram.png" alt="My Image" />
            </Link> */}


        </div>
      </div>
    </div>

  );
}

export default About;





