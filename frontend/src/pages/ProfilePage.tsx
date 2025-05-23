import { useState, useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../redux/services/meBlogsApi";

export default function ProfilePage() {
  const { data: user, isLoading } = useGetUserQuery();
  const [updateUser] = useUpdateUserMutation();

  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "email@example.com",
    bio: "No bio available",
    image: "https://via.placeholder.com/100",
    instagram: "",
    linkedIn: "",
    github: "",
    twitter: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "Your Name",
        email: user.email || "email@example.com",
        bio: user.bio || "No bio available",
        image: user.profileImage || "https://via.placeholder.com/100",
        instagram: user.instagram || "",
        linkedIn: user.linkedIn || "",
        github: user.github || "",
        twitter: user.twitter || "",
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
        instagram: profile.instagram,
        linkedIn: profile.linkedIn,
        github: profile.github,
        twitter: profile.twitter,
      }).unwrap();
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(`Error: ${error.data?.message || error.message}`);
    }
  };

  return (
    <div className="bg-neutral-900 text-white flex flex-col items-center p-6 sm:p-8">
      <div className="w-full border-b border-neutral-700 pb-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">Profile</h1>
      </div>

      {/* Profile Information */}
      <div className="flex flex-col sm:flex-row items-center w-full mt-6 gap-8">
        <img
          src={profile.image}
          alt="Profile"
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-neutral-600 shadow-xl"
        />
        <div className="flex-1 text-left">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-neutral-400 text-sm">
            @{profile.email.split("@")[0]}
          </p>
          <p className="text-neutral-300 mt-4 leading-relaxed">{profile.bio}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-base font-medium transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-neutral-800 border border-neutral-700 p-6 sm:p-8 rounded-xl overflow-y-auto shadow-xl w-full max-w-3xl max-h-[90vh] animate-fade-in space-y-6">
            <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email (disabled) */}
              <div>
                <label className="block text-sm text-white">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full p-3 rounded bg-neutral-700 text-white cursor-not-allowed"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm text-white">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32 resize-none"
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm text-white">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={profile.image}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-neutral-700">
              <h3 className="text-lg font-medium text-white mb-4">
                Social Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["instagram", "linkedIn", "github", "twitter"].map(
                  (platform) => (
                    <div key={platform}>
                      <label className="block text-sm text-white capitalize">
                        {platform}
                      </label>
                      <input
                        type="text"
                        name={platform}
                        value={(profile as any)[platform]}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-md text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white transition font-semibold"
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
