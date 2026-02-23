import axios from "axios";

import React from "react";
import { useState } from "react";

const API = "http://localhost:4000";

function Feedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFeedback = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/feedback`, feedback);
    setFeedback({ name: " ", email: " ", message: " " });

    alert("Feedback submitted!");
  };
  return (
    <div>
      <form
        onSubmit={handleFeedback}
        className="bg-white p-6 rounded-lg shadow mt-10"
      >
        <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>

        <input
          type="text"
          placeholder="NAME"
          className="w-full mb-3 p-2 border rounded"
          value={feedback.name}
          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="EMAIL"
          className="w-full mb-3 p-2 border rounded"
          value={feedback.email}
          onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your feedback..."
          className="w-full mb-3 p-2 border rounded"
          rows="3"
          value={feedback.message}
          onChange={(e) =>
            setFeedback({ ...feedback, message: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
