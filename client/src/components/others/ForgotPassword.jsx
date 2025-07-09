import React, { useState } from "react";
import { forgotPassword } from "../../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await forgotPassword(email);
      setMessage("If your email exists, a reset link has been sent.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Forgot Password</h3>
              <form className="row y-gap-20 pt-30" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
              {message && (
                <div className="text-green-500 text-center mt-4">{message}</div>
              )}
              {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}