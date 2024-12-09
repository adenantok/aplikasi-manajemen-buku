"use client";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);

  // Ambil data dari API
  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:8080/books");
      const result = await response.json();

      if (result.status === "success" && Array.isArray(result.data)) {
        setBooks(result.data);
      } else {
        console.error("Unexpected API response structure");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  // Jalankan fetch saat komponen pertama kali dimuat
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Dashboard Buku</h1>
      {books.length === 0 ? (
        <p className="text-gray-600">Data buku belum tersedia.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Judul</th>
                <th className="border border-gray-300 px-4 py-2">Penulis</th>
                <th className="border border-gray-300 px-4 py-2">Deskripsi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{book.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
