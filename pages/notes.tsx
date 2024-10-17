import { useEffect, useState } from 'react';
import { fetchNotes } from '../utils/api';
import { Note } from '../utils/types';

const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data: Note[] = await fetchNotes();
                if (Array.isArray(data)) {
                    setNotes(data);
                } else {
                    setNotes([]);
                }
            } catch (err) {
                setError('Failed to load notes');
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="notes-container">
            <h1>Notes</h1>
            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <ul className="notesList">
                    {notes.map(note => (
                        <li key={note.id} className="noteItem">
                            <p>{note.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotesPage;
