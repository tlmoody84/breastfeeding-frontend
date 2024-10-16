import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../utils/api';
import NoteItem from './NoteItem';
import { Note } from '../utils/types';

const NoteList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                setNotes(data);
            } catch (err) {
                setError('Failed to load notes');
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
            {notes.map(note => (
                <NoteItem key={note.id} note={note} />
            ))}
        </div>
    );
};

export default NoteList;
