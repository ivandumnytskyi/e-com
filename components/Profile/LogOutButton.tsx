'use client'
import { signOut } from "next-auth/react";

function LogOutButton() {
  return (
    <button className="bg-amber-400 hover:cursor-pointer" onClick={() => signOut({callbackUrl: '/auth/signin'})}>LogOut</button>
  )
}

export default LogOutButton