import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../services/axiosconfig";

export default function OtpForm({ email, onSuccess, onClose }) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Join the array into a single string (e.g., "1234")
    const otpValue = otp.join("");

    try {
      // The controller expects { email, otp }
      const response = await api.post('user/otp-verify', {
        email: email, 
        otp: (otpValue) 
      });

      if (response.data.status === "success") {
        onSuccess(otpValue);
        toast.success("Registration successfull!");
      }
      // console.log("SignedUp Successfully!")
    } catch (error) {
      // Capture the error message from your customError class
      toast.error("Submit failed:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");
  };

  return (
  <div className="fixed inset-0 backdrop-blur-sm h-screen flex items-center justify-center bg-black/40 z-50">
    {/* 1. Added 'relative' to this container */}
    <form
      onSubmit={handleSubmit}
      className="relative bg-white p-8 rounded-xl shadow-md flex flex-col items-center gap-5 w-75"
    >
      {/* 2. Styled close button with 'absolute' positioning */}
      <button
        type="button"
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-xl font-bold leading-none cursor-pointer"
        onClick={onClose}
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-gray-800">Enter OTP</h2>
      <p className="text-sm text-gray-500 -mt-2">Sent to {email}</p>

      <div className="flex gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition shadow-sm font-medium"
      >
        Submit
      </button>

      <button
        type="button"
        onClick={handleResend}
        className="text-blue-500 hover:underline text-sm"
      >
        Resend OTP
      </button>
    </form>
  </div>
);

}