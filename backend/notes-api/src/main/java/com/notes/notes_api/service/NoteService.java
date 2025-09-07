package com.notes.notes_api.service;

import com.notes.notes_api.model.Note;
import java.util.List;

public interface NoteService {
    List<Note> getAllNotes();
    List<Note> getNotesByArchiveStatus(boolean archived);
    Note getNoteById(Long id);
    Note createNote(Note note);
    Note updateNote(Long id, Note note);
    void deleteNote(Long id);
}
