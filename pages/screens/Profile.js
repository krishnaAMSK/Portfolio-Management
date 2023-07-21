import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [current, setCurrent] = useState(null);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        const data = response.data;
        setLoggedIn(data.loggedIn);
        setCurrent(data.current);
        setUser(data.user);
        setProjects(data.projects);
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Header></Header>
      <div>profile details</div>
      {/* <h1 className="text-center text-3xl font-bold py-8">Portfolio</h1>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/">
            <a className="text-white text-sm font-medium hover:text-gray-300">Home</a>
          </Link>
          {loggedIn ? (
            <>
              <Link href="/logout">
                <a className="text-white text-sm font-medium hover:text-gray-300">Logout</a>
              </Link>
              <Link href="/projects">
                <a className="text-white text-sm font-medium hover:text-gray-300">About</a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a className="text-white text-sm font-medium hover:text-gray-300">Login</a>
            </Link>
          )}
          <Link href="/search">
            <a className="text-white text-sm font-medium hover:text-gray-300">Search</a>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto py-8">
        <Link href="/search">
          <a className="absolute top-4 left-4 bg-gray-800 text-white py-2 px-4 rounded-md text-sm">
            Back
          </a>
        </Link>

        {loggedIn && current._id.toString() === user._id.toString() && (
          <form action="/projects" method="POST">
            <input
              type="text"
              name="title"
              placeholder="Title"
              required
              className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-full"
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              className="border border-gray-300 rounded-md px-4 py-2 mt-4 w-full"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md"
            >
              Add Project
            </button>
          </form>
        )}

        <div className="bg-white border border-gray-300 rounded-md px-4 py-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong>Contact:</strong> {user.contact}
          </p>
        </div>

        <div className="bg-white border border-gray-300 rounded-md px-4 py-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Projects</h2>

          {projects && projects.length ? (
            <ul className="space-y-4">
              {projects.map((project) => (
                <li key={project._id}>
                  <h2 className="text-lg font-bold mb-1">{project.title}</h2>
                  <p className="text-gray-600">{project.description}</p>
                  {loggedIn && current._id.toString() === user._id.toString() && (
                    <Link href={`/projects/${project._id}/edit`}>
                      <a className="text-blue-500 hover:text-blue-700 text-sm">Edit</a>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-600 py-4">
              <p>No projects found.</p>
            </div>
          )}
        </div>
      </div> */}
      <Footer></Footer>
    </div>
  );
};

export default PortfolioPage;





