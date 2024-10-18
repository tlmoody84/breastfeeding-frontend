import axios from 'axios';
import { ApiUser, Feed, Note } from './types'; // Adjust import paths as needed

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
});

// Function to fetch users
export const fetchUsers = async (): Promise<ApiUser[]> => {
    const response = await api.get('/users');
    return response.data;
};

// Function to fetch feeds
export const fetchFeeds = async (): Promise<Feed[]> => {
    const response = await api.get('/feeds');
    return response.data;
};

// Function to fetch notes
export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data;
};

// Function to submit a new feed
export const submitFeed = async (feedData: Omit<Feed, 'id'>): Promise<Feed> => {
    try {
        const response = await api.post('/feeds', feedData);
        return response.data; // Return the created feed
    } catch (error) {
        console.error('Error submitting feed:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
};

// Function to submit a new note
export const submitNote = async (noteData: Omit<Note, 'id'>): Promise<Note> => {
    try {
        const response = await api.post('/notes', noteData);
        return response.data; // Return the created note
    } catch (error) {
        console.error('Error submitting note:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
};

// Function to submit a new user
export const submitUser = async (userData: Omit<ApiUser, 'id'>): Promise<ApiUser> => {
    try {
        const response = await api.post('/users', userData);
        return response.data; // Return the created user
    } catch (error) {
        console.error('Error submitting user:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
};

const fetchLikes = async (imageId) => {
    try {
        const response = await fetch(`http://localhost:4000/api/likes/${imageId}`);

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error fetching likes: ${response.statusText}`);
        }

        const likesData = await response.json();

        // Display the likes along with user_ids
        likesData.forEach(like => {
            console.log(`User ID: ${like.user_id} liked image ${like.image_id}`);
        });

        // Optionally return the likes data for further use
        return likesData;
    } catch (error) {
        console.error('Failed to fetch likes:', error);
        // Handle the error as needed (e.g., display a message to the user)
    }
};
