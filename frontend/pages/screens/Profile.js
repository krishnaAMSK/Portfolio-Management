import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/router';

const Profile = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await axios.get("../api/user");
      if (response.data.success) {
        console.log('From Profile')
        setUser(JSON.parse(response.data.user));
      }
    };

    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContact(user.contact);
      setAbout(user.about);
      setSkills(user.skills);
    }
  }, [user]);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const router = useRouter();

  const handleUpdateProfile = async () => {
    console.log('From Profile Update')
    const response = await axios.post("http://localhost:5000/user/update",
    {
      email:user?.email,
      name:name,
      contact:contact,
      about:about,
      skills:skills
    });
    console.log(response.data)
    console.log('hmm')
    router.push('../screens/about');
  };

  const handleDeleteAccount = () => {
    // Add logic to delete the user account on the backend (not implemented here)
    // For simplicity, we are just logging a message here
    console.log('Account deleted');
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
        <h1 className="text-3xl font-semibold mb-4">Update Profile</h1>
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="text"
              value={user?.email}
              readOnly
              className="w-full p-2 text-black border rounded bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">About</label>
            <input
              type="text"
              value={about}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-black border rounded"
            />
          </div>

          <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Skills</label>
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

export default Profile;
