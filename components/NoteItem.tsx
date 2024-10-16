import React from 'react';
import { Note } from '../utils/types';

interface NoteItemProps {
    note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
    return <div>{note.content}</div>;
};

export default NoteItem;
