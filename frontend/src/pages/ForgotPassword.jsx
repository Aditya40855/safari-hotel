import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { requestOtp, resetPassword } from "../lib/api";

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get token and email directly from the URL magic link
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  // Step 1: Request Link, Step 2: Set New Password
  const [step, setStep] = useState(token ? 2 : 1);
  const [email, setEmail] = useState(emailParam || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Automatically switch to Step 2 if a token is detected in the URL
  useEffect(() => {
    if (token) {
      setStep(2);
    }
  }, [token]);

  // Step 1: Send the Magic Link
  const handleRequestLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await requestOtp(email); // This now triggers the magic link email
      setMessage("A secure reset link has been sent to your email.");
    } catch (err) {
      setMessage(err.message || "User not found. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password using the token from the URL
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Use the token from searchParams instead of manual OTP
      await resetPassword(email, token, newPassword);
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(err.message || "Invalid or expired link. Please request a new one.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfaf7] px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-light tracking-widest text-[#1a1a1a] uppercase text-center mb-8">
          Account Recovery
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRequestLink} className="space-y-6">
            <p className="text-sm text-gray-600 text-center">
              Enter your email to receive a secure password reset link.
            </p>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 border border-gray-300 focus:border-[#a68546] outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#333] transition"
            >
              {loading ? "Processing..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <p className="text-sm text-gray-600 text-center">
              Create a new secure password for <b>{email}</b>.
            </p>
            <input
              type="password"
              placeholder="New Secure Password"
              className="w-full p-4 border border-gray-300 focus:border-[#a68546] outline-none text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#333] transition"
            >
              {loading ? "Updating..." : "Confirm New Password"}
            </button>
            <div className="text-center">
               <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#a68546]"
               >
                 Request new link
               </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-6 text-center text-xs text-[#a68546] font-medium tracking-wide uppercase">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;