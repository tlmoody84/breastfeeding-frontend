export interface PostLikes {
    id: number;
    userId: string;
    postId: number;
    timestamp: Date;  
}
export interface User {
    id: string;
    name: string;
    email?: string;    
}
