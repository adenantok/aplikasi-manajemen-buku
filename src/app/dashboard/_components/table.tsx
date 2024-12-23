"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  user_id: number;
  title: string;
  author: string;
  description: string;
}

export const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  async function fetchBooksFromServer() {
    // if (!token) {
    //   console.error("Token not found, redirecting to login...");
    //   router.push("/login");
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:8080/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      //if (!response.ok) return;

      const jsonData = await response.json();
      
      if (jsonData.status === "success" && Array.isArray(jsonData.data)) {
        setBooks(jsonData.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      router.push("/login");
    }
  }


  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      router.push("/login"); // Redirect ke halaman login jika token tidak ditemukan
    }
  }, []);
  

  useEffect(() => {
    fetchBooksFromServer();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            console.log("Add button clicked!");
            router.push("/add");
          }}
        >
          Tambah Buku
        </button>
      </div>
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
                <th className="border border-gray-300 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{book.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.description}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          console.log(`View button clicked for book ${book.id}`);
                          router.push(`/book/${book.id}`);
                        }}
                      >
                        Lihat
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          console.log(`Edit button clicked for book ${book.id}`);
                          router.push(`/edit/${book.id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          console.log(`Delete button clicked for book ${book.id}`);
                          // TODO: Implement delete logic
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


