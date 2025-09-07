package com.notes.notes_api.service;

import com.notes.notes_api.model.Note;
import com.notes.notes_api.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {
    
    @Autowired
    private NoteRepository noteRepository;

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    @Override
    public List<Note> getNotesByArchiveStatus(boolean archived) {
        return noteRepository.findByArchived(archived);
    }

    @Override
    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Note not found with id: " + id));
    }
    
    @Override
    @Transactional
    public Note createNote(Note note) {
        note.setId(null);  // Explicitly set ID to null
        return noteRepository.save(note);
    }
    
    @Override
    public Note updateNote(Long id, Note noteDetails) {
        Note note = getNoteById(id);
        note.setNoteText(noteDetails.getNoteText());
        note.setArchived(noteDetails.isArchived());
        return noteRepository.save(note);
    }
    
    @Override
    public void deleteNote(Long id) {
        Note note = getNoteById(id);
        noteRepository.delete(note);
    }
}
