// types.ts
import { ReactNode } from 'react';


export interface ApiUser {
    id: number;
    email: string;
    created_at: string;
    name?: string; // Optional if not always present
}

export interface Note {
    id: number;
    content: string;
}

export interface Feed {
    id?: number; // Make id optional
    user_id: number;
    duration: number; // in minutes
    feed_time: string; // ISO date string
    notes?: string | null; // Optional field for notes
    title?: string; // Optional field for title
    content?: string; // Optional field for content
}

// Like interface
export interface Like {
    id?: number; // Make id optional, depending on your use case
    user_id: number; // ID of the user who liked the image
    image_id: string; // Identifier for the liked image
    created_at: string; // Timestamp of when the like was created (ISO date string)
}
