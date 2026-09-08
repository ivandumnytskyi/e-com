"use client";

import { useEffect, useState } from "react";

function Togle() {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setToggled(document.documentElement.classList.contains("dark"));
  }, []);

  const changeTheme = () => {
    const newToggled = !toggled;

    setToggled(newToggled);

    document.documentElement.classList.toggle("dark", newToggled);
  };
  return (
    <button
      className={`w-12 h-6 ${toggled ? "bg-orange-600" : "bg-orange-300"} relative transition-all duration-300`}
      onClick={() => {
        changeTheme();
      }}
    >
      <div
        className={`w-6 h-6 bg-(--white-colour) ${toggled ? "ml-6" : "ml-0"} transition-all duration-300`}
      ></div>
    </button>
  );
}

export default Togle;
