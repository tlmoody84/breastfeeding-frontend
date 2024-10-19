
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Feed {
    id: number;
    user_id: string;
    duration: number;
    notes?: string;
}

export interface ImageVote {
    id: number;
    user_id: string;
    image_id: string; 
    timestamp: string;
}

export interface Note {
    id: number;
    user_id: string;
    content: string;
    timestamp: string;
}

export interface User {
    id: string; 
    name: string;
    email: string;
}

export const logFeeding = async (userId: string, duration: number, notes?: string): Promise<Feed> => {
    const { data, error } = await supabase
        .from('feeds') 
        .insert([{ user_id: userId, duration, notes }])
        .select() as { data: Feed[] | null; error: any }; 

    if (error) throw new Error(`Error logging feeding: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No feeding data returned after logging.');
    }

    return data[0]; 
};



export const logImageVote = async (userId: string, imageId: string): Promise<ImageVote> => {
    const { data, error } = await supabase
    .from('image_votes')
    .insert([{ user_id: userId, image_id: imageId }])
    .select() as { data: ImageVote[] | null; error: any };


    if (error) throw new Error(`Error logging image vote: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No image vote data returned after logging.');
    }

    return data[0]; 
};

export const logNote = async (userId: string, content: string): Promise<Note> => {
    const { data, error } = await supabase
        .from('notes') 
        .insert([{ user_id: userId, content }])
        .select() as { data: Note[] | null; error: any }; 

    if (error) throw new Error(`Error logging note: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No note data returned after logging.');
    }

    return data[0]; 
};

export const submitUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    const { data, error } = await supabase
        .from('users') 
        .insert([userData])
        .select() as { data: User[] | null; error: any }; 

    if (error) throw new Error(`Error submitting user: ${error.message}`);

    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('No user data returned after submission.');
    }

    return data[0]; 
};

export const getUserById = async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
        .from('users') 
        .select('*')
        .eq('id', userId)
        .single() as { data: User | null; error: any }; 

    if (error) throw new Error(`Error retrieving user: ${error.message}`);
    return data; 
};
