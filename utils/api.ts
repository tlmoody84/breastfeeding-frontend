// // api.ts

// import axios from 'axios';
// import { ApiUser, Feed, Note } from './types';

// // Create an Axios instance with a base URL
// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api', // Ensure the base URL is correct
// });

// // Function to fetch users
// export const fetchUsers = async (): Promise<ApiUser[]> => {
//     const response = await api.get('/users'); // Remove the leading '/api'
//     return response.data; // Axios provides the data directly
// };

// // Function to fetch feeds
// export const fetchFeeds = async (): Promise<Feed[]> => {
//     const response = await api.get('/feeds'); // Remove the leading '/api'
//     return response.data;
// };

// // Function to fetch notes
// export const fetchNotes = async (): Promise<Note[]> => {
//     const response = await api.get('/notes'); // Remove the leading '/api'
//     return response.data;
// };








// import axios from 'axios';
// import { ApiUser, Feed, Note } from './types'; // Adjust import paths as needed

// // Create an Axios instance with a base URL
// const api = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
// });

// // Function to fetch users
// export const fetchUsers = async (): Promise<ApiUser[]> => {
//     const response = await api.get('/users');
//     return response.data;
// };

// // Function to fetch feeds
// export const fetchFeeds = async (): Promise<Feed[]> => {
//     const response = await api.get('/feeds');
//     return response.data;
// };

// // Function to fetch notes
// export const fetchNotes = async (): Promise<Note[]> => {
//     const response = await api.get('/notes');
//     return response.data;
// };

// // Function to submit a new feed
// export const submitFeed = async (feedData: Feed): Promise<void> => {
//     try {
//         const response = await api.post('/feeds', feedData);
//         // Handle success, maybe return response or something else
//         return response.data;
//     } catch (error) {
//         console.error('Error submitting feed:', error);
//         throw error; // Re-throw the error for handling elsewhere
//     }
// };








import axios from 'axios';
import { ApiUser, Feed, Note, Question, Reply } from './types'; // Adjust import paths as needed

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

// Function to fetch questions
export const fetchQuestions = async (): Promise<Question[]> => {
    const response = await axios.get('http://localhost:4000/api/breastfeeding-questions');
    return response.data;
};

// Function to submit a new question
export const submitQuestion = async (questionData: { content: string; user_id: number }): Promise<Question> => {
    try {
        const response = await api.post('/questions', questionData);
        return response.data; // Return the created question
    } catch (error) {
        console.error('Error submitting question:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
};

// Function to submit a reply
export const submitReply = async (questionId: number, replyData: { content: string; user_id: number }): Promise<Reply> => {
    try {
        const response = await api.post(`/questions/${questionId}/replies`, replyData);
        return response.data; // Return the created reply
    } catch (error) {
        console.error('Error submitting reply:', error);
        throw error; // Re-throw the error for handling elsewhere
    }
};
