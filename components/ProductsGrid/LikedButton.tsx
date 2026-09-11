'use client'

import { useState } from "react";

type Props = {};

function LikedButton({}: Props) {
  const [liked, setLiked] = useState(false);
  const likeAction = () => {
    setLiked (prev => !prev)
  };
  return (
    <button onClick={likeAction} className="absolute right-2 top-35 h-6 w-6 flex items-center justify-center">
      <img src="/heartWhite.svg" alt="Like" className="h-5" />
      <img src="/heartRed.svg" alt="Like" className={`h-5 absolute ${liked ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
    </button>
  );
}

export default LikedButton;
