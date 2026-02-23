
import { useEffect, useState } from "react";
import axios from "axios";
import {  Link } from 'react-router-dom';
const API = "http://localhost:4000"; 

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
 

  
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/getallnotes`);
    setNotes(res.data.content);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API}/update/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(`${API}/add`, form);
    }

    setForm({ title: "", details: "" });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/delete/${id}`);
    fetchNotes();
  };

  
  const handleEdit = (note) => {
    setForm({ title: note.title, details: note.details   });
    setEditingId(note._id);
  };
  

  return (
    <div className="min-h-screen bg-black-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">Note Manager</h1>

      
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Note" : "Add Note"}
          </h2>

          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            placeholder="Content"
            className="w-full mb-3 p-2 border rounded"
            rows="4"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <div className="grid md:grid-cols-2 gap-4">
          {notes && notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="text-gray-600 mt-2">{note.details}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                >
                  <Link to="/note">Details</Link>
                </button>
              </div>
            </div>
          ))}
        </div>

  
      </div>

      <button
                
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                >
                  <Link to="/feedback">Feedback</Link>
                </button>
    </div>
  );  
}
