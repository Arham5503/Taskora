import { useState } from "react";
import { Camera, Mail, User, Briefcase, AtSign, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    profilePic:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    fullName: "Jonathan Anderson",
    displayName: "Jon",
    title: "Senior Product Designer",
    email: "jonathan.anderson@company.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

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
                  src={
                    isEditing ? editedProfile.profilePic : profile.profilePic
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                    <Camera size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
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
                  value={isEditing ? editedProfile.fullName : profile.fullName}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      fullName: e.target.value,
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
                  value={isEditing ? editedProfile.title : profile.title}
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
                  value={profile.email}
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
