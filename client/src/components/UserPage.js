import React, { useState, useEffect } from "react";
import "../styles/UserPage.css";
import axios from "axios";
import Header from "./header"; // Import Header component

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT from localStorage

      if (!token) {
        alert("You must be logged in to view this page.");
        return;
      }

      try {
        // Fetch user data from the backend
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token in the Authorization header
          },
        });

        setUserData(response.data); // Set user data
        console.log(response.data);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-container">
      <Header /> {/* Include the Header component here */}

      <div className="user-box">
        <h2>Welcome, {userData ? userData.username : "Loading..."}</h2>
        <div className="user-info">
          {userData ? (
            <>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Role:</strong> {userData.role}</p>
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
