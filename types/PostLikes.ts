export interface PostLikes {
    id: number;
    userId: string;
    postId: number;
    timestamp: Date;   // or number for Unix timestamp
}
export interface User {
    id: string;
    name: string;
    email?: string;     // Make email optional if not always required
}
