"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-2 flex justify-between">
      <div className="flex">
        <div className="text-white px-4 py-2">Dashboard Admin</div>
        <Link href="/dashboard" className="text-white px-4 py-2">
         Home
        </Link>
      </div>
      <button onClick={logout} className="text-white px-4 py-2">
        Logout
      </button>
    </nav>
  );
}
