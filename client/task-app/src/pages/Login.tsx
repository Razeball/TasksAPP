// src/pages/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Form from "../components/Form";
import FormHeader from "../components/FormHeader"; // Assuming this is a layout component
import { log } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import type { AuthPayload } from "../types";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Redirect if user is already authenticated and auth state is no longer loading
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleLogin = async (credentials: AuthPayload) => {
    setIsLoading(true);
    try {
      const token = await log(credentials);
      login(token); // AuthContext handles decoding and setting user
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the form if auth is still loading
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <FormHeader isLogin={true}>
      <Form isLogin={true} onSubmit={handleLogin} isLoading={isLoading} />
    </FormHeader>
  );
}
