import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AddCircle as Add } from '@mui/icons-material';
import { useUser } from '../contexts/userContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  // const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [contacts, setContacts] = useState([
    { type: "github", value: "" },
    { type: "linkedin", value: "" },
    { type: "phone", value: "" },
  ]);

  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);
  const [file, setFile] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const response = await axios.get("/api/user", { params: { _t: Date.now() } });
        if (response.data.success) {
          console.log('User Data:', response.data.user);
          setUser(JSON.parse(response.data.user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    console.log('User State:', user);
    if (user) {
      setName(user.name);
      setContacts(user.contacts);
      setAbout(user.about);
      setSkills(user.skills);
      setFile(user.photo);
    }
  }, [user]);

  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);
          const response = await axios.post("http://localhost:5000/file/upload", data);
          console.log(response.data)
          setFile(response.data);
        }
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
    getImage();
  }, [file, user])



  const router = useRouter();

  const handleContactChange = (type, value) => {
    console.log("Updating contact:", type, value);

    const updatedContacts = contacts.map(contact =>
      contact.type === type ? { ...contact, value } : contact
    );

    console.log("Updated contacts:", updatedContacts);

    setContacts(updatedContacts);
  };


  const handleUpdateProfile = async () => {
    console.log('From Profile Update')
    const response = await axios.post("http://localhost:5000/user/update",
      {
        email: user?.email,
        name: name,
        contacts: contacts,
        about: about,
        skills: skills,
        photo: file,
      }
    );
    console.log(response.data)
    const update = await axios.post("/api/auth/login", { user: response.data.user });
    console.log('logged with new info')
    toast.success(update.data.message, {
      position: "top-center",
      autoClose: 3000,
    });
    // router.reload();
  };

  const handleResetPasswordClick = () => {
    router.push('/screens/ResetPassword');
  };

  const handleDeleteAccount = async () => {
    try {
      if (user) {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="react-confirm-alert-overlay">
                <div className="react-confirm-alert-body">
                  <h1 className="react-confirm-alert-title">Confirm Deletion</h1>
                  <p className="react-confirm-alert-message">
                    Are you sure you want to delete your account?
                  </p>
                  <div className="react-confirm-alert-button-group">
                    <button
                      className="react-confirm-alert-button cancel"
                      onClick={onClose}
                    >
                      No
                    </button>
                    <button
                      className="react-confirm-alert-button confirm"
                      onClick={async () => {
                        try {
                          const removedUser = await axios.delete(`http://localhost:5000/user/delete/${user?.email}`);
                          const response = await axios.get("../api/auth/logout");
                          console.log('Account deleted');
                          router.push('/');
                          toast.success('Account deleted successfully.', {
                            position: "top-center",
                            autoClose: 3000,
                          });
                        } catch (error) {
                          console.error("Error while deleting User:", error);
                        }
                        onClose();
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            );
          },
        });
      }
    } catch (error) {
      console.error("Error while deleting User:", error);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  console.log(name);
  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-md p-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Update Profile</h1>
        <div>
          <label htmlFor="fileInput" className="relative cursor-pointer">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <img
              src={file || "/man.png"}
              alt="Profile Picture"
              width={150}
              height={150}
              className={`mx-auto border border-gray-300 ${file ? 'rounded' : 'rounded-full'}`}
            />
          </label>
        </div>
        <div>
          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">Email</label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="w-full p-2 text-black border rounded bg-gray-100"
            />
          </div>

          {/* LinkedIn */}
          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">LinkedIn</label>
            <input
              type="text"
              value={contacts.find(contact => contact.type === "linkedin")?.value || ""}
              onChange={e => handleContactChange("linkedin", e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>

          {/* GitHub */}
          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">GitHub</label>
            <input
              type="text"
              value={contacts.find(contact => contact.type === "github")?.value || ""}
              onChange={e => handleContactChange("github", e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">Phone</label>
            <input
              type="text"
              value={contacts.find(contact => contact.type === "phone")?.value || ""}
              onChange={e => handleContactChange("phone", e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>



          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">About</label>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white-700 font-bold mb-2">Skills</label>
            {skills?.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = e.target.value;
                    setSkills(updatedSkills);
                  }}
                  className="w-full p-2 border text-black rounded mr-2"
                />
                <button
                  onClick={() => handleDeleteSkill(skill)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-full p-2 border text-black rounded mr-2"
              />
              <button
                onClick={handleAddSkill}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Skill
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={handleUpdateProfile}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Profile
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={handleResetPasswordClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Account
          </button>
        </div>
      </div>
      <Footer />
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

export default Profile;
