
import React from 'react'


export default async function DeleteById(id: any) {
    
    const token = localStorage.getItem("token");
    console.log(token)
    try {
        
        const response = await fetch(`http://localhost:8080/books/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          });
    
          const data = await response.json();
          console.log(data);
          console.log(data.message);
          console.log(data.status);
          if (response.ok) {
              console.log("Book deleted successfully");
              window.location.reload();
            } else {
              console.error("Failed to delete book");
            }
    } catch (error) {
        console.error(error);
    }



}

