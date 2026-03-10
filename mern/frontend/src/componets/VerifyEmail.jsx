import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, resendCode, verifyEmail } from "../services/auth";

const useQueryEmail = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get("email") || "";
};

const VerifyEmail = () => {
  const emailFromQuery = useQueryEmail();
  const [email, setEmail] = useState(emailFromQuery);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!email || !code) {
      setError("Email and code are required.");
      return;
    }
    setLoading(true);
    try {
      await login({ email, code });
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Verification failed. Please check the code.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    if (!email) {
      setError("Enter your email to resend OTP.");
      return;
    }
    setResendLoading(true);
    try {
      const res = await resendCode(email);
      setInfo(res.msg || "OTP resent to your email.");
    } catch (err) {
      setError(err.response?.data?.msg || "Could not resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-xl border border-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-white text-center">
          Verify your email
        </h2>
        <p className="mt-2 text-sm text-slate-400 text-center">
          We have sent a 6-digit OTP to your email.
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

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
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
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
          className="mt-4 w-full text-sm text-indigo-300 hover:text-indigo-200 disabled:opacity-60"
        >
          {resendLoading ? "Resending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
