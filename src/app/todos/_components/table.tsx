"use client";
import React, { useEffect, useState } from "react";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

export const DataTable = () => {
  const [todos, setTodos] = useState<[] | null>();
  const token = localStorage.getItem("token");
  const getTodos = async () => {
    try {
      const res = await fetch("https://dummyjson.com/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await fetch('https://dummyjson.com/auth/me', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log({"user":data})
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  // {
  //     "id": 20,
  //     "todo": "Bake a pie with some friends",
  //     "completed": false,
  //     "userId": 162
  // },
  return (
    <>
      <div className="flex flex-wrap gap-3">
        {todos?.map((todo: Todo) => (
          <div
            className="border rounded-2xl w-[100px] h-[100px] mr-[40px]"
            key={todo.id}
          >
            <p>{todo.todo}</p>
            <p>{todo.completed}</p>
            <p>{todo.userId}</p>
          </div>
        ))}
      </div>
    </>
  );
};
