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

export interface Question {
    id: number;
    user_id: number;
    content: string;
    replies: Reply[]; // Add a replies field
}

export interface Reply {
    id: number;
    question_id: number;
    user_id: number;
    content: string;
}
