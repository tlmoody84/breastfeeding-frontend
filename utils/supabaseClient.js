import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; 
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// CRUD Operations

// Create
export const logFeeding = async (userId, duration, notes) => {
    const { data, error } = await supabase
        .from('feeds')
        .insert([{ user_id: userId, duration, notes }]);

    if (error) throw error;
    return data;
};

// Retrieve
export const getFeedings = async (userId) => {
    const { data, error } = await supabase
        .from('feeds')
        .select('*')
        .eq('user_id', userId);

    if (error) throw error;
    return data;
};

// Update
export const updateFeeding = async (feedId, duration, notes) => {
    const { data, error } = await supabase
        .from('feeds')
        .update({ duration, notes })
        .eq('id', feedId);

    if (error) throw error;
    return data;
};

// Delete
export const deleteFeeding = async (feedId) => {
    const { data, error } = await supabase
        .from('feeds')
        .delete()
        .eq('id', feedId);

    if (error) throw error;
    return data;
};
