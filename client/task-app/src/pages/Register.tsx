import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Form from "../components/Form";
import FormHeader from "../components/FormHeader";
import { register } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import type { AuthPayload } from "../types";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleRegister = async (credentials: AuthPayload) => {
    if (!credentials.username || !credentials.email || !credentials.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await register(credentials);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      toast.error("Registration failed. This email may already be in use.");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <FormHeader isLogin={false}>
      <Form isLogin={false} onSubmit={handleRegister} isLoading={isLoading} />
    </FormHeader>
  );
}
