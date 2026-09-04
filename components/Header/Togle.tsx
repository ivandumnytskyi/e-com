'use client'

import { useState } from "react";



function Togle() {
  const [toggled, setToggled] = useState(false);
  return (
    <button
        className={`w-12 h-6 ${toggled ? 'bg-green-500' : 'bg-orange-300'} relative transition-all duration-300`}
        onClick={() => setToggled(!toggled)}
      >
        <div className={`w-6 h-6 bg-amber-50 ${toggled ? 'ml-6' : 'ml-0'} transition-all duration-300`}></div>
      </button>
  )
}

export default Togle