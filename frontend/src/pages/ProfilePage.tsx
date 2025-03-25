import { useState, useEffect } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../redux/services/meBlogsApi";


export default function ProfilePage() {
  const { data: user, isLoading } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "email@example.com",
    bio: "No bio available",
    image: "https://via.placeholder.com/100",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "John Doe",
        email: user.email || "johndoe@example.com",
        bio: user.bio || "No bio available",
        image: user.profileImage || "https://via.placeholder.com/100",
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-4">
        <div className="w-full border-b border-neutral-700 pb-4">
          <div className="w-32 h-6 bg-neutral-700 animate-pulse rounded"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full mt-6 gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-neutral-700 animate-pulse"></div>
          <div className="flex-1 text-left space-y-3">
            <div className="w-48 h-6 bg-neutral-700 animate-pulse rounded"></div>
            <div className="w-36 h-4 bg-neutral-700 animate-pulse rounded"></div>
            <div className="w-full h-16 bg-neutral-700 animate-pulse rounded"></div>
            <div className="w-32 h-8 bg-red-400 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUser({
        name: profile.name,
        bio: profile.bio,
        profileImage: profile.image,
      }).unwrap();
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(`Error: ${error.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-4">
      <div className="w-full border-b border-neutral-700 pb-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-center w-full mt-6 gap-6">
        <img
          src={profile.image}
          alt="Profile"
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-neutral-600 shadow-lg"
        />
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-neutral-400 text-sm">@{profile.email.split("@")[0]}</p>
          <p className="text-neutral-300 mt-3 leading-relaxed">{profile.bio}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-5 py-2 bg-red-400 hover:bg-red-500 rounded-md text-white text-sm font-medium transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
            <div className="mt-3 space-y-4">
              <div>
                <label className="block text-sm text-neutral-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full p-2 rounded bg-neutral-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400">Profile Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={profile.image}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-sm font-medium transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
