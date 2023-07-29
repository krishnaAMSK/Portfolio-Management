import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function Search() {
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    try {
      const response = await fetch(`http://localhost:5000/search/?name=${searchTerm}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-12">
        <div className="bg-black rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">User Search</h1>
          <form action="/search" method="GET" onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              required
              className="border border-gray-400 rounded-md py-2 px-3 mb-2 bg-black text-white-800"
            />{' '}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
            >
              Search
            </button>
          </form>

          {users && users.length ? (
            <div className="mt-6 flex flex-wrap">
              {users.map((user) => (
                <div key={user._id} className="user-box m-4 flex items-center ">
                  {/* Display the user photo on the left */}
                  <div className="mr-4">
                    <Image
                      src="/man.png"
                      alt="User Photo"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="user-name text-white font-semibold">{user.name}</div>
                    <p className="text-white">Email: {user.email}</p>
                    <p className="text-white">Contact: {user.contact}</p>
                    {/* Make the user information clickable */}
                    <a
                      className="view-profile-link text-blue-500 hover:text-blue-600 font-medium"
                      href={`/profile/${user._id}`} // Replace "profile" with your profile page route
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-white">No users found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
