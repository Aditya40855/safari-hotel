import React, { useState } from 'react';
import { requestOtp, resetPassword } from "../lib/api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Step 1: Handle OTP Request
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestOtp(email);
      setStep(2);
      setMessage("Verification code sent to your email.");
    } catch (err) {
      setMessage("User not found. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle Password Reset
  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      setMessage("Password updated successfully. You can now login.");
      // Redirect to login after 2 seconds
    } catch (err) {
      setMessage("Invalid or expired code. Please try again.");
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
          <form onSubmit={handleRequestOtp} className="space-y-6">
            <p className="text-sm text-gray-600 text-center">
              Enter your email address to receive a 6-digit verification code.
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
              {loading ? "Sending..." : "Request Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <p className="text-sm text-gray-600 text-center">
              Enter the code sent to <b>{email}</b> and choose a new password.
            </p>
            <input
              type="text"
              placeholder="6-Digit Code"
              maxLength="6"
              className="w-full p-4 border border-gray-300 focus:border-[#a68546] outline-none text-center tracking-[10px] text-lg font-mono"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Secure Password"
              className="w-full p-4 border border-gray-300 focus:border-[#a68546] outline-none text-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#333] transition"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
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