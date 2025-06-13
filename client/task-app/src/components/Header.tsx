import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "../assets/Icon.svg";
import toast from "react-hot-toast";

interface HeaderProps {
  profile?: boolean;
  openCreate?: () => void;
  onSearch?: (query: string) => void;
}

export default function Header({
  profile = false,
  openCreate,
  onSearch,
}: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl">
          TaskApp
        </Link>
        {!profile && onSearch && (
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered ml-2 w-24 md:w-auto"
            value={query}
            onChange={handleSearchChange}
          />
        )}
      </div>
      <div className="flex-none gap-2">
        {!profile && openCreate && (
          <button className="btn btn-ghost" onClick={openCreate}>
            Create Task
          </button>
        )}
        <div className="flex items-center mx-2">
          <span>{user?.username || user?.email}</span>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img alt="User Avatar" src={Icon} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/user" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => toast("Settings page coming soon!(Not really)")}
              >
                Settings
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
