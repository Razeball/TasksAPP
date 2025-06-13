import { useState } from "react";
import { Link } from "react-router-dom";
import type { AuthPayload } from "../types";
import show from "../assets/show.svg";
import shownt from "../assets/shown't.svg";

interface FormProps {
  isLogin: boolean;
  onSubmit: (credentials: AuthPayload) => void;
  isLoading: boolean;
}

export default function Form({ isLogin, onSubmit, isLoading }: FormProps) {
  const [credentials, setCredentials] = useState<AuthPayload>({
    email: "",
    password: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (!isLoading) {
      onSubmit(credentials);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };

  return (
    <fieldset
      className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-4"
      disabled={isLoading}
    >
      <legend className="fieldset-legend text-3xl px-2">
        {isLogin ? "Login" : "Register"}
      </legend>
      <h2 className="m-2 flex justify-center text-xl">
        Enter your credentials
      </h2>

      {!isLogin && (
        <>
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            className="input input-bordered w-full"
            placeholder="Your Username"
            value={credentials.username}
            onChange={handleChange}
            onKeyDown={handleKey}
          />
        </>
      )}

      <label className="label">Email</label>
      <input
        type="email"
        name="email"
        className="input input-bordered w-full"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        onKeyDown={handleKey}
      />

      <label className="label">Password</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          className="input input-bordered w-full"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          onKeyDown={handleKey}
        />
        <button
          type="button"
          className="absolute right-0 top-0 h-full px-4 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label="Toggle password visibility"
        >
          <img
            src={showPassword ? show : shownt}
            alt="Show password icon"
            className="w-6 h-6"
          />
        </button>
      </div>

      <button
        type="button"
        className="btn btn-primary mt-4 w-full"
        onClick={handleFormSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : isLogin ? (
          "Login"
        ) : (
          "Register"
        )}
      </button>

      <p className="flex justify-center text-sm mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <Link
          className="ml-1 text-blue-400 hover:text-blue-600"
          to={isLogin ? "/register" : "/login"}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </fieldset>
  );
}
