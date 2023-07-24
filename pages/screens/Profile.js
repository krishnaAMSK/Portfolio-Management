import React from 'react';
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";

const Profile = () => {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '123-456-7890',
    about: 'I am a frontend developer',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    password: '********',
  };

  const [name, setName] = useState(userData.name);
  const [contact, setContact] = useState(userData.contact);
  const [about, setAbout] = useState(userData.about);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const handleUpdateProfile = () => {
    // Add logic to update the user profile on the backend (not implemented here)
    // For simplicity, we are just logging the updated data here
    console.log({
      name,
      email: userData.email,
      contact,
      about,
      skills,
    });
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
              value={userData.email}
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
          {skills.map((skill, index) => (
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
