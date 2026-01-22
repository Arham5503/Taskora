import { useEffect, useState } from "react";
import { Camera, Mail, User, Briefcase, AtSign, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    profile:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    username: " ",
    title: " ",
    email: " ",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [isUploading, setIsUploading] = useState(false);

  // Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setIsUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Failed to upload image: " + error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Show preview immediately (optional)
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profile: reader.result });
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);
      if (cloudinaryUrl) {
        setEditedProfile({ ...editedProfile, profile: cloudinaryUrl });
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const dataToSend = {
      username: editedProfile.username,
      title: editedProfile.title,
      profile: editedProfile.profile,
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        console.log("error");
        return;
      }

      const data = await res.json();
      setProfile(data.user);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          return console.log("error");
        }
        const data = await res.json();
        setProfile(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative -mt-16 mb-6">
              <div className="relative inline-block">
                <img
                  src={isEditing ? editedProfile?.profile : profile?.profile}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing && (
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <User size={18} />
                  Edit Profile
                </button>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={
                    isEditing ? editedProfile?.username : profile?.username
                  }
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      username: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition-all ${
                    isEditing
                      ? "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Display Name
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <AtSign size={16} className="text-gray-500" />
                  Display Name
                </label>
                <input
                  type="text"
                  value={
                    isEditing ? editedProfile.displayName : profile.displayName
                  }
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      displayName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition-all ${
                    isEditing
                      ? "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                  }`}
                />
              </div> */}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-gray-500" />
                  Title
                </label>
                <input
                  type="text"
                  value={isEditing ? editedProfile?.title : profile?.title}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      title: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition-all ${
                    isEditing
                      ? "border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-gray-200 bg-gray-50 text-gray-700 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-gray-500" />
                  Email
                  <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    Read-only
                  </span>
                </label>
                <input
                  type="email"
                  value={profile?.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Your email address cannot be changed. Contact support if you
                  need to update it.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-3 mt-8 pt-6 border-t">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Profile Information
          </h3>
          <p className="text-sm text-blue-700">
            Your profile information is visible to other team members. Keep it
            up to date to help others connect with you.
          </p>
        </div>
      </div>
    </div>
  );
}
