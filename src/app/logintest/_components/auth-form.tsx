"use client"
import { useRouter } from "next/navigation";
import React from "react";

export const AuthForm = () => {
  const router = useRouter();
  const onLoginHandler = async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, // optional, defaults to 60
        }),
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      router.push("/todos");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={onLoginHandler}>login</button>
    </div>
  );
};
