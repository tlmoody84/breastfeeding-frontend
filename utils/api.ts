import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Ensure this is defined in your .env.local file
});

// Optional: Set up interceptors for requests/responses if needed
api.interceptors.request.use((config) => {
    // Modify request config here if necessary
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    // Handle responses here if necessary
    return response;
}, (error) => {
    // Handle errors globally
    return Promise.reject(error);
});

// Define interfaces for your data
export interface Feed {
    id: number;
    content: string;
}

export interface Note {
    id: number;
    content: string;
}

export interface User {
    id: number;
    name: string;
}

// Function to fetch feeds
export const fetchFeeds = async (): Promise<Feed[]> => {
    const response = await api.get('/feeds'); // Adjust endpoint as needed
    return response.data as Feed[];
};

// Function to fetch notes
export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes'); // Adjust endpoint as needed
    return response.data as Note[];
};

// Function to fetch users
export const fetchUsers = async (): Promise<User[]> => {
    const response = await api.get('/users'); // Adjust endpoint as needed
    return response.data as User[];
};
