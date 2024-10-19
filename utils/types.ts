// types.ts
import { ReactNode } from 'react';


export interface ApiUser {
    id: number;
    email: string;
    created_at: string;
    name?: string; 
}

export interface Note {
    id: number;
    content: string;
}

export interface Feed {
    id?: number; 
    user_id: number;
    duration: number; 
    feed_time: string; 
    notes?: string | null; 
    title?: string; 
    content?: string; 
}

export interface Like {
    id?: number; 
    user_id: number;
    image_id: string; 
    created_at: string; 
}
