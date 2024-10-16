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
                console.log('Fetched notes:', data); // Log the data received
                if (Array.isArray(data)) {
                    setNotes(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setNotes([]); // Reset to empty array if not valid
                }
            } catch (err) {
                console.error('Error loading notes:', err);
                setError('Failed to load notes'); // Update error state
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Notes</h1>
            {notes.length === 0 ? (
                <p>No notes available.</p>
            ) : (
                <ul>
                    {notes.map(note => (
                        <li key={note.id}>
                            <p>{note.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotesPage;

