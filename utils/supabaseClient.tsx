// import dotenv from 'dotenv';
// dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;




if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define types for various entities
export interface Feed {
    id: number;
    user_id: string;
    duration: number;
    notes?: string;
}

export interface ImageVote {
    id: number;
    user_id: string;
    image_id: string; // Assuming images are identified by a string ID
    timestamp: string;
}

export interface Note {
    id: number;
    user_id: string;
    content: string;
    timestamp: string;
}

export interface User {
    id: string; // Adjust type based on your user ID structure
    name: string;
    email: string;
}

// CRUD Operations for Feeds
export const logFeeding = async (userId: string, duration: number, notes?: string): Promise<Feed> => {
    const { data, error } = await supabase
        .from('feeds') // Use the table name without type argument
        .insert([{ user_id: userId, duration, notes }])
        .select() as { data: Feed[] | null; error: any }; // Explicitly type the response

    if (error) throw new Error(`Error logging feeding: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No feeding data returned after logging.');
    }

    return data[0]; // Return the created Feed
};



// CRUD Operations for Image Votes
export const logImageVote = async (userId: string, imageId: string): Promise<ImageVote> => {
    const { data, error } = await supabase
    .from('image_votes')
    .insert([{ user_id: userId, image_id: imageId }])
    .select() as { data: ImageVote[] | null; error: any };


    if (error) throw new Error(`Error logging image vote: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No image vote data returned after logging.');
    }

    return data[0]; // Return the created ImageVote
};

// CRUD Operations for Notes
export const logNote = async (userId: string, content: string): Promise<Note> => {
    const { data, error } = await supabase
        .from('notes') // Use the table name without type argument
        .insert([{ user_id: userId, content }])
        .select() as { data: Note[] | null; error: any }; // Explicitly type the response

    if (error) throw new Error(`Error logging note: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No note data returned after logging.');
    }

    return data[0]; // Return the created Note
};

// CRUD Operations for Users
export const submitUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    const { data, error } = await supabase
        .from('users') // Use the table name without type argument
        .insert([userData])
        .select() as { data: User[] | null; error: any }; // Explicitly type the response

    if (error) throw new Error(`Error submitting user: ${error.message}`);

    // Ensure data is correctly typed and check if it's not empty
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No user data returned after submission.');
    }

    return data[0]; // Now safe to access data[0]
};

// Retrieve user by ID
export const getUserById = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users') // Use the table name without type argument
        .select('*')
        .eq('id', userId)
        .single() as { data: User | null; error: any }; // Explicitly type the response

    if (error) throw new Error(`Error retrieving user: ${error.message}`);
    return data; // data should be of type User | null
};
