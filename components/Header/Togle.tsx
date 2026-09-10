"use client";

import { useContext } from "react";
import { ThemeContext } from "@/app/ThemeProvider";

function Togle() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeToggle must be used inside ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  const toggled = theme === "dark";

  return (
    <>
    <button
      className={`w-12 h-6 ${
        toggled ? "bg-orange-600" : "bg-orange-300"
      } relative transition-all duration-300`}
      onClick={toggleTheme}
    >
      <div
        className={`w-6 h-6 bg-(--white-colour) ${
          toggled ? "ml-6" : "ml-0"
        } transition-all duration-300`}
      />
    </button>
    </>
    
  );
}


export default Togle;
