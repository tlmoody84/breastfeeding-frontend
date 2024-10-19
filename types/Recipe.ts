type Recipe = {
    id: string; 
    title: string;
    ingredients: string[];
    instructions: string;
    created_at?: string;  
    updated_at?: string;  
};

export default Recipe;
