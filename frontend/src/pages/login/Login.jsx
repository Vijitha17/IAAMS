import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    let valid = true;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!trimmedPassword) {
      setPasswordError("Please enter your password");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        if (data?.token) {
          localStorage.setItem("token", data.token);
          navigate("/home");
        } else {
          throw new Error("Invalid login response: token not found");
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-400">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600 mb-6">Login to your account</p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {emailError && (
          <p className="text-red-500 text-sm text-left">{emailError}</p>
        )}

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-2 mt-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        {passwordError && (
          <p className="text-red-500 text-sm text-left">{passwordError}</p>
        )}

        <div className="flex justify-between text-sm text-blue-600 mt-2">
          <p className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "Show Password"}
          </p>
          <p
            className="cursor-pointer"
            onClick={() => alert("Forgot Password feature coming soon!")}
          >
            Forgot Password?
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 mt-6 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
