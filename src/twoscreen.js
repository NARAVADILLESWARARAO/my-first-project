import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md"; // Import email icon from React Icons
import { PiLock } from "react-icons/pi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Twoscreenlayout = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSignIn = () => {
    if (email && password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      alert("Email and Password stored in local storage!");
    } else {
      alert("Please fill in both email and password!");
    }
  };

  const headings = [
    "Empower your *career journey",
    "The path toward *success",
    "*Challenging real-world questions",
    "Personalized *learning road-map",
    "Customized *Resume Builder",
  ];
  const displayedTexts = [
    " Reaidy.io, Al-driven interview bot, that offers realistic mock interviews.",
    " AI mock interviews to sharpen your skills and achieve career advancements.",
    " Realistic simulation and preparation on demand with diverse interview scenarios.",
    " An efficient journey toward your career goals with steady progression.",
    " Highlight your skills with professional templates and guided success.",
  ];

  const [heading, setHeading] = useState(headings[0]);
  const [fullText, setFullText] = useState(displayedTexts[0]);
  const [displayedText, setDisplayedText] = useState("");
  const speed = 50; // Typing speed in milliseconds

  useEffect(() => {
    let i = 0;
    let typingTimeout;

    // Function to type the text
    const typeWriter = () => {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
        typingTimeout = setTimeout(typeWriter, speed);
      }
    };

    // Reset displayedText and start typing
    setDisplayedText("");
    typeWriter();

    // Cleanup timeout on unmount
    return () => clearTimeout(typingTimeout);
  }, [fullText]);

  // Auto-Rotate Text
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentIndex = displayedTexts.indexOf(fullText);
      const nextIndex = (currentIndex + 1) % displayedTexts.length;

      setFullText(displayedTexts[nextIndex]);
      setHeading(headings[nextIndex]);
    }, 3000); // Change text every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [displayedTexts, headings, fullText]);

  // Styled Heading
  const getStyledHeading = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      if (word.startsWith("*")) {
        return (
          <span key={index} style={{ color: "#FF6b00", fontWeight: "bold" }}>
            {word.slice(1)} {/* Remove the '*' from the word */}
          </span>
        );
      } else {
        return <span key={index}>{word} </span>;
      }
    });
  };
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black text-white flex flex-col justify-center items-center overflow-hidden max-lg:hidden">
        <h1 className="text-5xl font-bold pb-4 whitespace-nowrap">
          {getStyledHeading(heading)}
        </h1>
        <p className="text-xl">{displayedText}</p>
      </div>
      <div className="w-1/2 bg-white-400 p-4 max-lg:w-[100vw]">
        <nav className="flex justify-center items-center">
          <img src="navimage.png" alt="logo" className="w-60"></img>
        </nav>
        <div className="flex flex-col items-center ">
          {/* Google Sign-In Button */}
          <button className="flex  justify-center w-80  h-11 items-center gap-5 p-3 border border-gray-300 rounded-md  mt-14 shadow-sm hover:bg-gray-100">
            {/* <img
              src="https://w7.pngwing.com/pngs/989/129/png-transparent-google-logo-google-search-meng-meng-company-text-logo.png"
              alt="Google Logo"
              className="w-7 h-7 mr-2 bg-transparent"
            /> */}
            <FcGoogle />

            <a href="#">Continue with Google</a>
          </button>

          {/* Divider */}
          <div className="flex items-center mt-4 w-80">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-2 text-gray-500 text-sm ">
              Or Sign in with email
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="relative w-80">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex items-center pl-9 text-start justify-center w-full p-3 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 mt-5"
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="Please enter a valid email address"
            />
            <MdEmail
              className="absolute left-3 mt-3 top-1/2 items-start transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className="relative w-80 mb-4">
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"} // Toggle between password and text type
              placeholder="Password"
              className="flex items-center pl-9 text-start justify-center w-full p-4 border border-gray-300  mb-3 rounded-md shadow-sm hover:bg-gray-100 mt-5"
            />
            <PiLock
              className="absolute left-3 mt-1 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            {/* Eye Icon */}
            <div
              className="absolute right-3 mt-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </div>
          </div>
          <button
            className="bg-orange-500 text-white w-80 h-14 rounded-lg mb-10 "
            onClick={handleSignIn}
          >
            Sign in
          </button>
          <p>
            {" "}
            <a href="#" className="text-orange-500 underline m-10 text-lg">
              Register as an Employer
            </a>
          </p>
          <p className="mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-orange-500 ">
              Sign up for free
            </a>
          </p>
          <p className="mt-14">powered by</p>
          <img src="poweredbylogo.png " className="w-40"></img>
          <div className="flex gap-4 mt-5">
            <p
              href="/terms-of-use"
              className="text-gray-500 hover:text-orange-500 text-sm"
            >
              Terms of Use
            </p>
            <span className="text-gray-500">|</span>
            <p className="text-gray-500 hover:text-orange-500 text-sm">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Twoscreenlayout;
