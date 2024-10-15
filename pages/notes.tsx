// pages/notes.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Note {
    id: number;
    content: string;
}

const NotesPage: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
                setNotes(response.data);
            } catch (err) {
                setError('Failed to fetch notes');
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotesPage;
