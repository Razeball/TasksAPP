// src/pages/User.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import PopModal from "../components/PopModal";
import { useAuth } from "../context/AuthContext";
import { editUser, checkUser } from "../services/AuthService";
import type { AuthPayload } from "../types";

type EditState = "LOCKED" | "EDITABLE";

export default function User() {
  const { user, logout } = useAuth();

  const [editState, setEditState] = useState<EditState>("LOCKED");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [credentials, setCredentials] = useState<AuthPayload>({
    email: user?.email || "",
    username: user?.username || "",
    password: "",
  });

  const isPasswordEntered = credentials.password.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnlock = async () => {
    if (!credentials.password) {
      setError("You must enter your current password to make changes.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await checkUser({
        email: credentials.email,
        password: credentials.password,
      });
      setEditState("EDITABLE");
      toast.success("You can now edit your profile.");
    } catch (err) {
      setError("Incorrect password or server error. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await editUser(credentials);
      toast.success("Profile updated successfully! You will be logged out.");
      // Logout to force re-authentication with new details if needed, because I don't know how to refresh it
      setTimeout(logout, 1500);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (editState === "LOCKED") {
      handleUnlock();
    } else {
      handleSaveChanges();
    }
  };

  return (
    <>
      <Header profile={true} />
      <PopModal isOpen={!!error} onClose={() => setError(null)} title="Error">
        <p>{error}</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-primary" onClick={() => setError(null)}>
            Close
          </button>
        </div>
      </PopModal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-screen">
        <div className="flex justify-center items-center">
          <div className="text-center">
            <Avatar />
            <h2 className="text-3xl mt-4">{user?.username || user?.email}</h2>
            {editState === "EDITABLE" && (
              <p className="text-green-400 mt-2">
                Profile Unlocked for Editing
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6 justify-center">
          {/* Email (Read-only) */}
          <div>
            <label className="text-lg">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              value={credentials.email}
              readOnly
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-lg">Username</label>
            <input
              type="text"
              name="username"
              className="input input-bordered w-full mt-1"
              onChange={handleChange}
              value={credentials.username}
              placeholder="Enter a new username"
              readOnly={editState === "LOCKED"}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-lg">
              {editState === "LOCKED"
                ? "Enter Current Password to Unlock"
                : "New Password (optional)"}
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              className="input input-bordered w-full mt-1"
              placeholder={
                editState === "LOCKED"
                  ? "••••••••"
                  : "Leave blank to keep current password"
              }
            />
          </div>

          <div>
            <button
              className="btn btn-primary w-full"
              onClick={handleSubmit}
              disabled={
                isLoading || (editState === "LOCKED" && !isPasswordEntered)
              }
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : editState === "LOCKED" ? (
                "Unlock"
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
