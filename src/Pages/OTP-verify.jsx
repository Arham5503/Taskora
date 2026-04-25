import { Link, useNavigate } from "react-router-dom";
import desk from "../assets/desk.jpg";
import OTPInput from "../UI/OTPinput";
import { useEffect, useState } from "react";
import { verifyOTP, resendOTP } from "../api/ApiBuilder";
import { useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
function OTP() {
  const location = useLocation();
  const { user } = useAuth();
  const email = location.state?.email || user?.email;

  const [time, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (time === 0) return;
    const timer = setInterval(() => setTimer(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const otpString = otp.join("");

    if (otpString.length < 6) {
      return setError("Please enter the complete 6-digit OTP");
    }

    setLoading(true);
    try {
      await verifyOTP(email, otpString);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!loading && !email) {
      navigate("/signup");
    }
  }, [email, loading]);
  const handleResend = async () => {
    if (time > 0) return;
    setError("");
    setResendMsg("");
    try {
      await resendOTP(email);
      setTimer(60);
      setResendMsg("New OTP sent!");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <main className="h-screen flex flex-col bg-white font-sans">
        {/* Navbar */}
        <header className="w-[90%] mx-auto py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="Logo.png" alt="PlanOra Logo" className="w-40" />
          </div>

          <Link to={"/login"}>
            <button className="bg-[#105EF5] text-white px-5 py-2 rounded-lg hover:bg-[#0d4ed1]">
              Sign in
            </button>
          </Link>
        </header>

        {/* Main Content */}
        <section className="flex flex-1 flex-col justify-center md:justify-between md:flex-row py-4">
          {/* Left Side - Login Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-16">
            <div className="w-full max-w-sm">
              <h2 className="text-3xl font-bold mb-1">Verify Email Address</h2>
              <p className="text-gray-600 mb-6">
                Enter the <strong>6-digit</strong> OTP sent to your email
                address
              </p>

              <div className=" my-6" />
              {/* Form Insertion */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* OTPInput now needs to lift state up */}
                <OTPInput otp={otp} setOtp={setOtp} />

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {resendMsg && (
                  <p className="text-green-500 text-sm">{resendMsg}</p>
                )}
                <p className="text-sm text-gray-500">
                  {time > 0 ? `Code expires in ${time}s` : "Code expired"}
                </p>

                <p className="text-sm">
                  Didn't get the code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={time > 0}
                    className={`font-semibold ${time > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#105EF5] cursor-pointer hover:underline"}`}
                  >
                    Resend Code
                  </button>{" "}
                </p>
                <button
                  type="submit"
                  className="w-full bg-[#105EF5] text-white py-2 rounded-md font-semibold hover:bg-[#0d4ed1] cursor-pointer"
                >
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>
            </div>
          </div>
          <div className="hidden md:block w-1/2 h-full overflow-hidden rounded-l-3xl">
            <img
              src={desk}
              alt="Laptop desk"
              className="object-cover h-full w-full"
            />
          </div>
        </section>
      </main>
    </>
  );
}
export default OTP;
