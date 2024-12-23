"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

export default function DetailBook() {
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // Ambil ID dari URL
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function fetchBookFromServer() {
    if (!token) {
      //console.error("Token not found, redirecting to login...");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setBook(jsonData.data);
      } else {
        console.error("Failed to fetch book:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBookFromServer();
    }
  }, [id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-4">
      <div className="space-y-4 px-4 py-6 bg-white rounded-md border shadow-md">
        {book ? (
          <>
            <div>
              <p className="font-bold">Judul:</p>
              <p>{book.title}</p>
            </div>
            <div>
              <p className="font-bold">Penulis:</p>
              <p>{book.author}</p>
            </div>
            <div>
              <p className="font-bold">Deskripsi:</p>
              <p>{book.description}</p>
            </div>
          </>
        ) : (
          <p>Loading book details...</p>
        )}
      </div>
    </div>
  );
}
