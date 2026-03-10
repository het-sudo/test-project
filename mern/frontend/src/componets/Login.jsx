import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, verifyLoginCode } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: email+password, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Step 1: Submit email + password, receive OTP
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await login({ email, password });
      // Move to OTP verification step
      setStep(2);
      setInfo("OTP sent to your email. Please enter the code.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit OTP code, get JWT and redirect
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await verifyLoginCode({ email, code });
      // Replace current history entry so back button doesn't go to login
      window.history.replaceState(null, "", "/");
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-xl border border-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-white text-center">
          {step === 1 ? "Welcome back" : "Enter OTP Code"}
        </h2>
        <p className="mt-2 text-sm text-slate-400 text-center">
          {step === 1
            ? "Sign in to access your notes."
            : "We sent a 6-digit code to your email."}
        </p>

        {error && (
          <p className="mt-4 rounded-md bg-red-900/40 border border-red-700 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        {info && (
          <p className="mt-4 rounded-md bg-emerald-900/30 border border-emerald-700 px-3 py-2 text-sm text-emerald-200">
            {info}
          </p>
        )}

        {step === 1 ? (
          // Step 1: Email + Password
          <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Email
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Password
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </form>
        ) : (
          // Step 2: OTP Code
          <form onSubmit={handleOtpSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Email
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
                type="email"
                value={email}
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                OTP Code
              </label>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 tracking-[0.3em] text-center"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <button
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setCode("");
                setError("");
                setInfo("");
              }}
              className="mt-2 w-full text-sm text-indigo-300 hover:text-indigo-200"
            >
              ← Back to login
            </button>
          </form>
        )}

        {step === 1 && (
          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Create one
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
