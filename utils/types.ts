// export interface NextAuthUser {
//     id: string; // Change this to string to match NextAuth
//     email: string;
// }


// export interface ApiUser {
//     id: number;
//     email: string;
//     created_at: string;
//     name?: string; // Keep this optional if it's not always present
// }







// types.ts

export interface ApiUser {
    id: number;
    email: string;
    created_at: string;
    name?: string; // Optional if not always present
}

export interface Feed {
    id: number;
    title: string;
    content: string;
}

export interface Note {
    id: number;
    content: string;
}
