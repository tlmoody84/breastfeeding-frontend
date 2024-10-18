import React, { useEffect, useState } from 'react';

interface Recipe {
    id?: number;
    title: string;
    ingredients: string[];
    instructions: string;
    author_id?: number; // Adjust as necessary
}

const RecipePage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newRecipe, setNewRecipe] = useState<Recipe>({
        title: '',
        ingredients: [],
        instructions: '',
    });

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4001/api/recipes');
            if (!response.ok) {
                throw new Error('Failed to fetch recipes: ' + response.status);
            }
            const data = await response.json();
            setRecipes(data);
        } catch (error: unknown) {
            console.error('Error fetching recipes:', error);
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleRecipeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            [e.target.name]: e.target.value,
        }));
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ingredientsArray = e.target.value.split(',').map(ingredient => ingredient.trim());
        setNewRecipe((prevRecipe) => ({
            ...prevRecipe,
            ingredients: ingredientsArray,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://rgoylwbneyshqowidhud.supabase.co/rest/v1/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer YOUR_SUPABASE_ANON_KEY`, // Replace with your key
                    'apikey': 'YOUR_SUPABASE_ANON_KEY', // Replace with your key
                },
                body: JSON.stringify(newRecipe),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to create recipe: ${errorData.message}`);
            }

            const data = await response.json();
            setRecipes((prevRecipes) => [...prevRecipes, data]); // Update the recipes list
            setNewRecipe({ title: '', ingredients: [], instructions: '' }); // Reset form
        } catch (error: unknown) {
            console.error('Error creating recipe:', error);
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <h1>All Recipes</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <strong>{recipe.title}</strong> - {recipe.ingredients.join(', ')}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    value={newRecipe.title}
                    onChange={handleRecipeChange}
                    required
                />
                <textarea
                    name="instructions"
                    placeholder="Instructions"
                    value={newRecipe.instructions}
                    onChange={handleRecipeChange}
                    required
                />
                <input
                    type="text"
                    name="ingredients"
                    placeholder="Ingredients (comma-separated)"
                    value={newRecipe.ingredients.join(', ')}
                    onChange={handleIngredientsChange}
                    required
                />
                <button type="submit">Add Recipe</button>
            </form>
            <button onClick={() => window.history.back()}>Back to Home</button>
        </div>
    );
};

export default RecipePage;
