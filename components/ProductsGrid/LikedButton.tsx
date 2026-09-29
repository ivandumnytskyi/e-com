"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


function LikedButton({ isLiked, productId }: { isLiked: boolean, productId: string }) {
const router = useRouter();

  const [disabled, setDisabled] = useState(false)
  const [liked, setLiked] = useState(isLiked);
  useEffect(() => {
  setLiked(isLiked);
}, [isLiked]);
  const likeAction = async () => {
    setDisabled(true)
    try {
      const nextLiked = !liked;
    const response = await fetch(`/api/liked/${productId}`, { method: nextLiked ? "POST" : "DELETE" });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(result?.error ?? "Could not update this item.");
    }
    setLiked(nextLiked);
    router.refresh();


    }catch(err){
      console.error(err)
    }finally{
      setDisabled(false)
    }
  };
  return (
    <button
      onClick={likeAction}
      className="absolute right-2 top-35 h-6 w-6 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
    >
      <img src="/heartWhite.svg" alt="Like" className="h-5" />
      <img
        src="/heartRed.svg"
        alt="Like"
        className={`h-5 absolute ${liked ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
    </button>
  );
}

export default LikedButton;
