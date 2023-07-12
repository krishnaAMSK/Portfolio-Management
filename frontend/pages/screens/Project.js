import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProjectPage = () => {
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
  
  console.log('From Project Page')
  console.log(projects);
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects[0]?.projects.map((project) => (
              <div key={project._id} className="bg-gray-800 rounded-lg shadow-md p-6 border border-blue-500">
                <h2 className="text-xl text-center font-semibold text-gray-100 mb-4">
                  {project.name}
                </h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
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
      <Footer/>
    </div>
  );
};

export default ProjectPage;

