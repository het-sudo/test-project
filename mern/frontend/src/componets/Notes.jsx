import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../services/auth";

const API = "http://localhost:4000";

// Set auth token on load
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", details: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/getallnotes`);
      setNotes(res.data.content || []);
    } catch (e) {
      setError("Failed to load notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    
    // Check for editNote in sessionStorage (from Note.jsx)
    const editNoteData = sessionStorage.getItem("editNote");
    if (editNoteData) {
      try {
        const parsed = JSON.parse(editNoteData);
        setForm({ title: parsed.title, details: parsed.details });
        setEditingId(parsed.id);
        // Clear the sessionStorage after using it
        sessionStorage.removeItem("editNote");
      } catch (e) {
        console.error("Failed to parse editNote:", e);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`${API}/update/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API}/add`, form);
      }

      setForm({ title: "", details: "" });
      fetchNotes();
    } catch (e) {
      setError("Could not save note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await axios.delete(`${API}/delete/${id}`);
      fetchNotes();
    } catch (e) {
      setError("Could not delete note. Please try again.");
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, details: note.details });
    setEditingId(note._id);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row">
        <section className="w-full md:w-5/12">
          <div className="rounded-2xl bg-slate-900/80 p-6 shadow-lg border border-slate-800">
            <h2 className="text-lg font-semibold text-white">
              {editingId ? "Edit note" : "Add a new note"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Capture quick thoughts or detailed ideas.
            </p>

            {error && (
              <p className="mt-4 rounded-md bg-red-900/40 border border-red-700 px-3 py-2 text-sm text-red-200">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Meeting notes, ideas..."
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Details
                </label>
                <textarea
                  placeholder="Write your note details here..."
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  rows="5"
                  value={form.details}
                  onChange={(e) =>
                    setForm({ ...form, details: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-70"
                    disabled={saving}
                  >
                    {saving
                      ? editingId
                        ? "Updating..."
                        : "Adding..."
                      : editingId
                        ? "Update note"
                        : "Add note"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setForm({ title: "", details: "" });
                        setEditingId(null);
                      }}
                      className="inline-flex items-center rounded-md border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="text-sm text-slate-400 hover:text-slate-200"
                  onClick={() => navigate("/feedback")}
                >
                  Give feedback →
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="w-full md:w-7/12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Your notes</h2>
              <p className="text-sm text-slate-400">
                {notes?.length || 0} saved{" "}
                {notes?.length === 1 ? "note" : "notes"}.
              </p>
            </div>
          </div>

          {loading ? (
            <p className="text-slate-400 text-sm">Loading notes...</p>
          ) : notes && notes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {notes.map((note) => (
                <article
                  key={note._id}
                  className="group rounded-2xl bg-slate-900/80 p-4 shadow border border-slate-800 hover:border-indigo-500/70 transition"
                >
                  <h3 className="text-base font-semibold text-white line-clamp-1">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                    {note.details}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      {note.createdAt
                        ? new Date(note.createdAt).toLocaleString()
                        : ""}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="rounded-md border border-slate-700 px-2 py-1 text-xs font-medium text-slate-100 hover:bg-slate-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="rounded-md border border-red-700/70 px-2 py-1 text-xs font-medium text-red-200 hover:bg-red-900/40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <Link
                    to={`/note/${note._id}`}
                    className="mt-2 inline-flex text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Open details
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-6 text-center">
              <p className="text-sm text-slate-400">
                You don&apos;t have any notes yet. Create your first one on the
                left.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
