package com.notes.notes_api.controller;

import com.notes.notes_api.model.Note;
import com.notes.notes_api.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "https://salomon-c9920c-gpte.vercel.app/")
public class NoteController {
    
    @Autowired
    private NoteService noteService;
    
    @GetMapping
    public ResponseEntity<List<Note>> getNotes(@RequestParam(required = false) Boolean archived) {
        List<Note> notes;
        if (archived != null) {
            notes = noteService.getNotesByArchiveStatus(archived);
        } else {
            notes = noteService.getAllNotes();
        }
        return ResponseEntity.ok(notes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }
    
    @PostMapping
    @Transactional
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        System.out.println("Received note: " + note.getNoteText() + ", Archived: " + note.isArchived());
        try {
            note.setId(null); // Ensure that the ID is not set (to trigger auto generation)
            Note createdNote = noteService.createNote(note);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
        } catch (Exception e) {
            e.printStackTrace(); // Print full exception details
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNote(id, note);
        return ResponseEntity.ok(updatedNote);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }
}
