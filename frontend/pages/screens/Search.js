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
    const searchTerm = e.target.search.value.trim();
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
                    {user && user.photo !== "" ? (
                      <Image
                        src={user.photo}
                        alt="User Photo"
                        width={100}
                        height={100}
                        className="rounded border-2 border-white mb-4"
                      />
                    ) : (
                      <Image
                        src="/man.png"
                        alt="Default User Photo"
                        width={100}
                        height={100}
                        className="rounded-full border-2 border-white mb-4"
                      />
                    )}
                  </div>
                  <div>
                    <div className="user-name text-white font-semibold">{user.name}</div>
                    <p className="text-white">{user.email}</p>
                    {/* Make the user information clickable */}
                    <a
                      className="view-profile-link text-blue-500 hover:text-blue-600 font-medium"
                      href={`/screens/View?email=${user.email}`} // Replace "profile" with your profile page route
                    >
                      View Profile
                    </a>
                    {user.role === "admin" && (
                      <div className="flex mt-2">
                        <button className="text-blue-500 hover:text-blue-600 font-medium mr-4">
                          Make Admin
                        </button>
                        <button className="text-red-500 hover:text-red-600 font-medium">
                          Delete User
                        </button>
                      </div>
                    )}
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

export async function getStaticProps(context) {
  return {
    props: {
      protected: true
    },
  }
}


