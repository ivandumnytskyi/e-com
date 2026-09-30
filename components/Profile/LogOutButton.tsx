'use client'
import { signOut } from "next-auth/react";

function LogOutButton() {
  return (
    <button className="hover:cursor-pointer hover:bg-(--main-colour) transition: duration-300 w-80 border-2 rounded-xl border-(--main-colour)" onClick={() => signOut({callbackUrl: '/auth/signin'})}>LogOut</button>
  )
}

export default LogOutButton