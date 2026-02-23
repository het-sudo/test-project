import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const API = "http://localhost:4000";
function Note() {

  const [note,setnote]=useState([])


  const fetchNotes = async (id) => {
    const res = await axios.get(`${API}/get/${id}`);
    setnote(res.data.content);
  };

  useEffect(() => {
    fetchNotes();
  }, [])




  

  return (
    <div>
   <div className="grid md:grid-cols-2 gap-4">
          {note.map((n) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-bold">{n.title}</h3>
              <p className="text-gray-600 mt-2">{n.details}</p>

            </div>
          ))}
        </div>
       
    </div>
  )
}

export default Note