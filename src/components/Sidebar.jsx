import React, { useContext, useState } from "react";
import { RiMenu5Line } from "react-icons/ri";
import { TbMessage2Plus } from "react-icons/tb";
import { MdOutlineMessage } from "react-icons/md";
import { BsQuestionLg } from "react-icons/bs";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between bg-gradient-to-t from-gray-800 to-slate-300 py-[25px] px-[15px] transition-all duration-500 ease-in-out ${extended ? "w-64" : "w-20"
        }`}
    >
      <div>

        <RiMenu5Line
          onClick={() => setExtended(!extended)}
          className={`cursor-pointer text-gray-900 mb-4 ${extended ? "text-3xl" : "text-3xl"
            }`}
        />


        <div
          onClick={() => newChat()}
          className="mt-[10px] flex items-center gap-2 py-2 px-3 text-gray-950 cursor-pointer bg-cyan-300 rounded-full shadow-lg shadow-gray-600/30 transition-all duration-500 ease-in-out"
        >
          <TbMessage2Plus className={`${extended ? "text-3xl" : "text-2xl"}`} />
          {extended && <p className="transition-opacity duration-500">New Chat</p>}
        </div>


        {extended && (
          <div className="flex flex-col mt-6 animate-fadeIn duration-500">
            <p className="mb-4">Recent</p>
            {prevPrompt?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gradient-to-r from-fuchsia-300 to-cyan-300 transition-colors duration-200"
              >
                <MdOutlineMessage className="text-3xl" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="flex flex-col">
        {[
          { icon: <BsQuestionLg />, label: "Help" },
          { icon: <BsClockHistory />, label: "Activity" },
          { icon: <AiOutlineSetting />, label: "Settings" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 p-2 pr-4 rounded-[50px] text-gray-900 cursor-pointer hover:bg-gray-300 transition-all duration-300"
          >
            <span className={`${extended ? "text-3xl" : "text-2xl"}`}>{item.icon}</span>
            {extended && <p className="transition-opacity duration-500">{item.label}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
