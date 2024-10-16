// api.ts

import axios from 'axios';
import { ApiUser, Feed, Note } from './types';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api', // Ensure the base URL is correct
});

// Function to fetch users
export const fetchUsers = async (): Promise<ApiUser[]> => {
    const response = await api.get('/users'); // Remove the leading '/api'
    return response.data; // Axios provides the data directly
};

// Function to fetch feeds
export const fetchFeeds = async (): Promise<Feed[]> => {
    const response = await api.get('/feeds'); // Remove the leading '/api'
    return response.data;
};

// Function to fetch notes
export const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes'); // Remove the leading '/api'
    return response.data;
};

