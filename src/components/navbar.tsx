import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-2 flex justify-between">
      <div className="flex">
        <div className="text-white px-4 py-2">Dashboard Admin</div>
        <Link href="/dashboard" className="text-white px-4 py-2">
         Home
        </Link>
      </div>
      <div className="text-white px-4 py-2">Logout</div>
    </nav>
  );
}
