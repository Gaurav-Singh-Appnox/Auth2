import { useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";

const OTPPage = () => {
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/verify-otp",
        { otp }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-blue-950 text-white">
      <p>Enter OTP</p>
      <div className="h-[2px]  bg-sky-950 mb-6 mt-2" />
      <OtpInput
        className="mt-8"
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>-</span>}
        renderInput={(props) => (
          <input
            {...props}
            className="w-12  text-center border-2 border-white rounded-md bg-sky-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
        )}
      />
      <button
        className="border-2 p-2 rounded bg-sky-600 hover:bg-blue-600 hover:scale-105 transition-all mt-4"
        onClick={handleOtpSubmit}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OTPPage;
