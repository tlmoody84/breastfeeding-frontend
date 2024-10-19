type Recipe = {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    author_id: string | null; 
    created_at?: string; 
    updated_at?: string; 
};
