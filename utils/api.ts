import axios from 'axios';
import { ApiUser, Feed, Note } from './types'; 

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
});

export const fetchUsers = async (): Promise<ApiUser[]> => {
    const response = await api.get('/users');
    return response.data;
};

export const fetchFeeds = async (): Promise<Feed[]> => {
    const response = await api.get('/feeds');
    return response.data;
};

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
};

export const submitFeed = async (feedData: Omit<Feed, 'id'>): Promise<Feed> => {
    try {
        const response = await api.post('/feeds', feedData);
        return response.data; 
    } catch (error) {
        console.error('Error submitting feed:', error);
        throw error; 
    }
};

export const submitNote = async (noteData: Omit<Note, 'id'>): Promise<Note> => {
    try {
        const response = await api.post('/notes', noteData);
        return response.data; 
    } catch (error) {
        console.error('Error submitting note:', error);
        throw error; 
    }
};

export const submitUser = async (userData: Omit<ApiUser, 'id'>): Promise<ApiUser> => {
    try {
        const response = await api.post('/users', userData);
        return response.data; 
    } catch (error) {
        console.error('Error submitting user:', error);
        throw error; 
    }
};

export const fetchLikes = async (imageId: string): Promise<any[]> => { 
    try {
        const response = await api.get(`/likes/${imageId}`); 
        const likesData = response.data;

        likesData.forEach(like => {
            console.log(`User ID: ${like.user_id} liked image ${like.image_id}`);
        });

        return likesData;
    } catch (error) {
        console.error('Failed to fetch likes:', error);
        throw error; 
    }
};