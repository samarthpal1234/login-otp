import React, { useState } from 'react';
import axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    axios.post('http://localhost:3000/otp', { otp: finalOtp })
      .then((res) => {
        console.log(res);
        alert('OTP Verified Successfully');
      })
      .catch((err) => {
        console.log(err);
        alert('Invalid OTP or server error');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter OTP
        </h2>

        <div className="flex justify-between gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-14 h-14 text-center text-xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
        >
          Verify OTP
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Didn’t get the code?{' '}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default Otp;
