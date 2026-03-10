import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/auth";

const API = "http://localhost:4000";

// Set auth token on load
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

function Note() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNote = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API}/get/${id}`);
      if (res.data.content && res.data.content._id) {
        setNote(res.data.content);
      } else {
        setError("Note not found");
      }
    } catch (e) {
      setError("Failed to load note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`${API}/delete/${id}`);
        navigate("/");
      } catch (e) {
        setError("Failed to delete note. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading note...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
          >
            ← Back to notes
          </button>
          <p className="rounded-md bg-red-900/40 border border-red-700 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300"
        >
          ← Back to notes
        </button>

        <article className="rounded-2xl bg-slate-900/80 p-6 shadow-lg border border-slate-800">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                {note?.title}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {note?.createdAt
                  ? new Date(note.createdAt).toLocaleString()
                  : ""}
              </p>
            </div>
            <div className="flex gap-2">
              {/* <button
                onClick={() => {
                  sessionStorage.setItem("editNote", JSON.stringify({
                    id: note._id,
                    title: note.title,
                    details: note.details
                  }));
                  navigate("/");
                }}
                className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
              >
                Edit
              </button> */}
              <button
                onClick={handleDelete}
                className="rounded-md border border-red-700/70 bg-red-900/30 px-3 py-2 text-sm font-medium text-red-200 hover:bg-red-900/50"
              >
                Delete
              </button>
            </div>
          </header>

          <div className="mt-6">
            <h2 className="text-sm font-medium text-slate-400 mb-2">Details</h2>
            <div className="rounded-lg bg-slate-950/50 p-4 border border-slate-800">
              <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                {note?.details}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Note;

