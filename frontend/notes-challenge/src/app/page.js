'use client'

import React, { useState, useEffect } from "react";

const API_URL = "https://notes-api-1737649845785.azurewebsites.net/api/notes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [viewMode, setViewMode] = useState("active");

  useEffect(() => {
    fetchNotes();
  }, [viewMode]);

  const fetchNotes = async () => {
    try {
      const isArchived = viewMode === "archived";
      const response = await fetch(`${API_URL}?archived=${isArchived}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleArchiveToggle = async (note) => {
    try {
      // Immediately remove the note from the current view
      setNotes(notes.filter(n => n.id !== note.id));
      
      // Reset editing state if the archived note was being edited
      if (editingNote?.id === note.id) {
        setEditingNote(null);
        setCurrentNote("");
      }

      // Send update to backend
      await fetch(`${API_URL}/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...note,
          archived: !note.archived
        }),
      });
      
      // Optionally fetch notes again to ensure sync with backend
      // fetchNotes();
    } catch (error) {
      console.error("Error updating archive status:", error);
      // If there's an error, refresh the view to restore the correct state
      fetchNotes();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(editingNote)
    if (currentNote.trim() === "") return;

    try {
      if (editingNote) {
        const responseBody = JSON.stringify({ 
          id: editingNote.id,
          noteText: currentNote,
          archived: editingNote.archived 
        })
        console.log(responseBody)
        const response = await fetch(`${API_URL}/${editingNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: responseBody,
        });
        const updatedNote = await response.json();
        setNotes(notes.map(note => 
          note.id === editingNote.id ? updatedNote : note
        ));
        setEditingNote(null);
      } else {
        const aux = JSON.stringify({ 
          noteText: currentNote,
          archived: false 
        })
        console.log(aux)
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            noteText: currentNote,
            archived: false 
          })
        });
        console.log('Request Body:', JSON.stringify({ 
          noteText: currentNote,
          archived: false 
        }));
        console.log('Response:', response);
        const newNote = await response.json();
        if (!newNote.archived && viewMode === "active") {
          setNotes([...notes, newNote]);
        }
      }
      
      setCurrentNote("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Optimistically remove from UI
      setNotes(notes.filter(note => note.id !== id));
      
      if (editingNote?.id === id) {
        setEditingNote(null);
        setCurrentNote("");
      }

      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      // If error occurs, refresh to get correct state
      fetchNotes();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-4 max-w-3xl mx-auto">
      <div className="mb-6">
        <select 
          value={viewMode} 
          onChange={(e) => setViewMode(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="active">Active Notes</option>
          <option value="archived">Archived Notes</option>
        </select>
      </div>

      {viewMode === "active" && (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="border p-2 mr-2 rounded w-64"
            placeholder="Enter your note..."
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editingNote ? "Update" : "Add"}
          </button>
          {editingNote && (
            <button
              type="button"
              onClick={() => {
                setEditingNote(null);
                setCurrentNote("");
              }}
              className="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="flex items-center p-4 border rounded bg-white shadow-sm">
            <p className="flex-1">{note.noteText}</p>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={note.archived}
                  onChange={() => handleArchiveToggle(note)}
                  className="form-checkbox h-5 w-5"
                />
                Archive
              </label>
              {!note.archived && (
                <button
                  onClick={() => {
                    setEditingNote(note);
                    setCurrentNote(note.noteText);
                  }}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(note.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="text-gray-500 text-center">
            {viewMode === "active" ? "No active notes" : "No archived notes"}
          </p>
        )}
      </div>
    </main>
  );
}