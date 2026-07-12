import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);

      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }

    getProfile();
  }, []);

  if (!user) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <h3>Name: {user.name}</h3>

      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;