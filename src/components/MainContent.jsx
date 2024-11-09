import React, { useContext, useState, useEffect } from "react";
import {
  FaCode,
  FaUserCircle,
  FaPencilAlt,
  FaCompass,
  FaMicrophoneAlt,
  FaTimes,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import newImage from "../assets/zenix.png";

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [recognitionActive, setRecognitionActive] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [showPopup, setShowPopup] = useState(false);

  const textOptions = [
    "How can I assist you today?",
    "What do you need help with?",
    "What can I do for you?",
    "How may I serve you today?",
    "How can I assist you now?",
  ];

  useEffect(() => {
    const currentText = textOptions[currentTextIndex];

    if (typingIndex < currentText.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(typingTimeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayedText("");
        setTypingIndex(0);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [typingIndex, currentTextIndex]);

  const handleSpeechInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.start();
      setRecognitionActive(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setRecognitionActive(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setRecognitionActive(false);
      };

      recognition.onend = () => {
        setRecognitionActive(false);
      };
    } else {
      console.log("Speech recognition not supported in this browser.");
    }
  };

  const handleNameChange = () => {
    setShowPopup(true);
  };

  const handleNameSubmit = (name) => {
    if (name) {
      setUserName(name);
      localStorage.setItem("userName", name);
      setShowPopup(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative bg-gradient-to-t from-rose-100 to-teal-100">
      <div className="flex items-center justify-between text-xl p-5 text-slate-700">
        <p className="text-4xl font-bold text-gray-950">Zenix AI</p>
        <FaUserCircle onClick={handleNameChange} className="cursor-pointer text-3xl" />
      </div>

      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-[56px] text-slate-500 font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-cyan-600 to-fuchsia-600 bg-clip-text text-transparent font-bold text-6xl">
                  Hello, {userName || "there"}...
                </span>
              </p>
              <p className="text-slate-800 text-6xl typing-animation">
                {displayedText}
                {typingIndex < textOptions[currentTextIndex].length && (
                  <span className="blink-cursor text-rose-500">|</span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div className="h-[200px] p-4 bg-gradient-to-t from-cyan-300 to-fuchsia-400 rounded-lg relative cursor-pointer shadow-lg shadow-gray-800/50 hover:from-cyan-400 hover:to-fuchsia-500">
                <p className="text-slate-700 text-lg">Suggest top 10 webseries.</p>
                <FaPencilAlt className="text-5xl p-1 absolute bottom-2 right-2 text-gray-700" />
              </div>
              <div className="h-[200px] p-4 bg-gradient-to-t from-cyan-300 to-fuchsia-400 rounded-lg relative cursor-pointer shadow-lg shadow-gray-800/50 hover:from-cyan-400 hover:to-fuchsia-500">
                <p className="text-slate-700 text-lg">What is loop in Javascript?</p>
                <FaCompass className="text-5xl p-1 absolute bottom-2 right-2 text-gray-700" />
              </div>

              <div className="h-[200px] p-4 bg-gradient-to-t from-cyan-300 to-fuchsia-400 rounded-lg relative cursor-pointer shadow-lg shadow-gray-800/50 hover:from-cyan-400 hover:to-fuchsia-500">
                <p className="text-slate-700 text-lg">Who is known as the "Mother of Dragons"?</p>
                <MdMessage className="text-5xl p-1 absolute bottom-2 right-2 text-gray-700" />
              </div>

              <div className="h-[200px] p-4 bg-gradient-to-t from-cyan-300 to-fuchsia-400 rounded-lg relative cursor-pointer shadow-lg shadow-gray-800/50 hover:from-cyan-400 hover:to-fuchsia-500">
                <p className="text-slate-700 text-lg">Who sits on the Iron Throne at the end of the series?</p>
                <FaCode className="text-5xl p-1 absolute bottom-2 right-2 text-gray-700" />
              </div>
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 mx-0 flex items-center gap-5">
              <FaUserCircle className="text-3xl" />
              <p className="text-lg font-[600] leading-[1.8] ml-6">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5">
              <img src={newImage} alt="Zenix Icon" className="w-20 h-20 rounded-[50%] -mt-4 -ml-6" />
              {loading ? (
                <div className="loading-animation">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-lg font-[500] leading-[1.8]"
                ></p>
              )}
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-700 p-8 rounded-lg text-center max-w-[400px] w-full relative">
              <FaTimes
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-2xl text-white cursor-pointer"
              />
              <h2 className="text-2xl font-bold text-cyan-600 mb-4">Enter Your Name</h2>
              <input
                type="text"
                placeholder="Your Name"
                className="p-2 rounded-lg border-none outline-none text-lg mb-4"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <button
                onClick={() => handleNameSubmit(userName)}
                className="bg-pink-600 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-700 transition mt-4 ml-3"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
          <div className="relative flex items-center justify-between gap-4 sm:gap-6 bg-gray-200 shadow-md shadow-gray-800/50 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg sm:text-xl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSent();
                }
              }}
            />
            <div className="absolute right-0 flex gap-3 sm:gap-4 items-center px-3">
              <FaMicrophoneAlt
                className={`text-2xl sm:text-3xl cursor-pointer ${recognitionActive ? "text-red-600" : "text-gray-900"}`}
                onClick={handleSpeechInput}
              />
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className="text-2xl sm:text-3xl cursor-pointer text-gray-900"
                />
              )}
            </div>
          </div>
          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-500">
            "Zenix may occasionally present inaccurate information, including about individuals, so please verify details for accuracy."
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
