import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const status = err.response?.status;

      if (status === 404) {
        setError("Your email is not registered. Please register.");
      } else if (status === 401) {
        setError("Incorrect password.");
      } else {
        setError(err.response?.data?.message || "Login failed. Try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label>Email</label>
          <input
            className="border w-full p-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="border w-full p-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Link href="/register"></Link>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
