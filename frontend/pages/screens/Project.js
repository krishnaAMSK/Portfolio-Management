import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProjectPage = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sourceLink, setSourceLink] = useState("");
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
  
  const handleCreate = async () => {
    const credentials = { title, description, sourceLink, email: user?.email }
    const response = await axios.post("http://localhost:5000/project/create",credentials);
  };

  console.log('From Project Page')

  // onSubmit={handleRegister}
  // console.log(projects);
  // console.log(user.email);
  
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto py-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">Projects</h1>
          <form onSubmit={handleCreate} className="my-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="block w-full bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              className="block w-full bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
              type="text"
              name="sourceLink"
              placeholder="Source Code"
              required
              className="block w-full bg-gray-800 text-white border border-gray-600 rounded-md py-2 px-3 mb-3"
              value={sourceLink}
              onChange={(e) => setSourceLink(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Add Project
            </button>
          </form>  
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
      <Footer></Footer>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true
    },
  }
}

export default ProjectPage;

