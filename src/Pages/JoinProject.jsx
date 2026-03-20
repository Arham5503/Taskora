import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInviteInfo, joinViaInvite } from "../api/ApiBuilder";
import { useAuth } from "../Context/AuthContext";
import { Users, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function JoinProject() {
  const { inviteCode } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [inviteInfo, setInviteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchInviteInfo();
  }, [inviteCode]);

  const fetchInviteInfo = async () => {
    try {
      const data = await getInviteInfo(inviteCode);
      setInviteInfo(data);
    } catch (err) {
      setError(err.message || "Invalid or expired invite link");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!user) {
      // Store invite code and redirect to login
      localStorage.setItem("pendingInvite", inviteCode);
      navigate("/login");
      return;
    }

    setJoining(true);
    try {
      const result = await joinViaInvite(inviteCode);
      setSuccess(true);
      toast.success("Successfully joined the project!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to join project");
      toast.error(err.message || "Failed to join project");
    } finally {
      setJoining(false);
    }
  };

  // Check for pending invite after login
  useEffect(() => {
    const checkPendingInvite = async () => {
      if (user && !authLoading) {
        const pendingInvite = localStorage.getItem("pendingInvite");
        if (pendingInvite && pendingInvite === inviteCode) {
          localStorage.removeItem("pendingInvite");
          handleJoin();
        }
      }
    };
    checkPendingInvite();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading invite details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invite</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Successfully Joined!
          </h1>
          <p className="text-gray-600 mb-2">
            You are now a member of <strong>{inviteInfo?.projectTitle}</strong>
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            You've Been Invited!
          </h1>
          <p className="text-gray-600">
            <strong>{inviteInfo?.invitedBy}</strong> has invited you to join a project
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-lg text-gray-900 mb-1">
            {inviteInfo?.projectTitle}
          </h2>
          {inviteInfo?.projectDescription && (
            <p className="text-gray-600 text-sm">{inviteInfo.projectDescription}</p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize">
              Role: {inviteInfo?.role}
            </span>
          </div>
        </div>

        {!user ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center mb-4">
              Please log in or sign up to join this project
            </p>
            <button
              onClick={() => {
                localStorage.setItem("pendingInvite", inviteCode);
                navigate("/login");
              }}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Log In to Join
            </button>
            <button
              onClick={() => {
                localStorage.setItem("pendingInvite", inviteCode);
                navigate("/signup");
              }}
              className="w-full px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleJoin}
              disabled={joining}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {joining ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Project"
              )}
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
