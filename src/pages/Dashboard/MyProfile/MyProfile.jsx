import React, { useEffect, useState } from "react";
import useAuth from '../../../hooks/useAuth';
import axios from "axios";

const MyProfile = () => {
  const { user } = useAuth(); // Firebase user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load profile from DB
  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://xdecor.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.user);
        setLoading(false);
      });
  }, [user]);

  const handleDisplayNameChange = (e) => {
    setProfile((prev) => ({ ...prev, displayName: e.target.value }));
  };

  // Upload image → set photoURL
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imageAPI_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    const res = await axios.post(imageAPI_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const imageUrl = res.data.data.display_url;

    setProfile((prev) => ({ ...prev, photoURL: imageUrl }));
  };

  // Save updated profile
  const handleSave = async () => {
    const updateData = {
      displayName: profile.displayName,
      photoURL: profile.photoURL,
    };

    await fetch(`https://xdecor.vercel.app/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    alert("Profile Updated Successfully!");
  };

  if (loading) return <p>Loading...</p>;

  // Photo priority: DB → Firebase → Default
  const finalPhoto =
    profile.photoURL ||
    user.photoURL ||
    "https://i.ibb.co/2FjV9Qp/default-avatar.png";

  return (
    <div className="max-w-lg mx-auto p-5">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      {/* Profile Photo */}
      <div className="mb-4 text-center">
        <img
          src={finalPhoto}
          alt="profile"
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
      </div>

      <input
        type="file"
        onChange={handleImageUpload}
        className="file-input file-input-bordered w-full mb-4"
      />

      {/* Display Name */}
      <label>Display Name:</label>
      <input
        type="text"
        value={profile.displayName || ""}
        onChange={handleDisplayNameChange}
        className="input input-bordered w-full mb-4"
        placeholder="Enter display name"
      />

      {/* Email (locked) */}
      <label>Email:</label>
      <input
        type="text"
        value={profile.email}
        disabled
        className="input input-bordered w-full mb-4"
      />

      <button className="btn btn-primary w-full" onClick={handleSave}>
        Save Profile
      </button>
    </div>
  );
};

export default MyProfile;
