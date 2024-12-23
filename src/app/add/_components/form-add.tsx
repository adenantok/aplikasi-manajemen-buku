import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function FormAdd() {
    const [user_id, setUserid] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const tokenFromStorage = localStorage.getItem("token");
        if (tokenFromStorage) setToken(tokenFromStorage);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log(user_id, title, author, description);

        const sendData = async () => {
            const userIdFromStorage = localStorage.getItem("userId");
            const user_id = userIdFromStorage ? parseInt(userIdFromStorage, 10) : 0;
            try {
                const data1 = { user_id : user_id,  title, author, description };
                
                const response = await fetch('http://localhost:8080/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify(data1),
                });
                const data = await response.json();
                console.log(data);
                console.log(data1)
                router.push('/dashboard');
            } catch (error) {
                console.error(error);
            }
        }
        sendData();
    }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6 bg-white rounded-md border shadow-md">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="text-gray-700">User ID:</span>
          <input
            type="hidden"
            value={user_id}
            onChange={e => setUserid(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Author:</span>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Simpan
      </button>
    </form>
  )
}


