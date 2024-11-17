import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header"; // Import the Header component
import "../styles/AdminPage.css"; 

const AdminPage = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch admin data from the backend
  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the JWT from localStorage

      if (!token) {
        alert("You must be logged in as an admin to view this page.");
        return;
      }

      try {
        // Fetch admin data from the backend
        const response = await axios.get("http://localhost:5000/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token in the Authorization header
          },
        });

        setAdminData(response.data); // Set admin data
        console.log(response.data);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching admin data", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-container">
      <Header /> {/* Add the Header component */}
      <div className="admin-box">
        <h2>Welcome, Admin {adminData ? adminData.username : "Loading..."}</h2>
        <div className="admin-info">
          {adminData ? (
            <>
              <p><strong>Username:</strong> {adminData.username}</p>
              <p><strong>Email:</strong> {adminData.email}</p>
              <p><strong>Role:</strong> {adminData.role}</p>
              {/* You can add other admin-specific data or actions here */}
            </>
          ) : (
            <p>Loading admin data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
