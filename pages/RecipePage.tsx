import React, { useEffect, useState } from 'react';

interface Recipe {
    id?: number;
    title: string;
    ingredients: string[];
    instructions: string;
}

const RecipePage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [newRecipe, setNewRecipe] = useState<Recipe>({ title: '', ingredients: [], instructions: '' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingRecipeId, setEditingRecipeId] = useState<number | null>(null);

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
            const recipeData = {
                title: newRecipe.title,
                ingredients: newRecipe.ingredients,
                instructions: newRecipe.instructions,
                // Remove author_id if not needed
            };
    
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing 
                ? `http://localhost:4001/api/recipes/${editingRecipeId}` 
                : 'http://localhost:4001/api/recipes';
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });
    
            // Handle the response...
        } catch (error) {
            console.error('Error creating/updating recipe:', error);
            setError((error as Error).message);
        }
    };
    

    const resetRecipeForm = () => {
        setNewRecipe({ title: '', ingredients: [], instructions: '' });
        setIsEditing(false);
        setEditingRecipeId(null);
    };
    
    const handleEditClick = (recipe: Recipe) => {
        if (recipe) {
            setNewRecipe({
                title: recipe.title,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
            });
            setIsEditing(true);
            setEditingRecipeId(recipe.id!);
        } else {
            console.error('Recipe not found for editing.');
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
                        <button onClick={() => handleEditClick(recipe)}>Edit</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="recipe-title"
                    name="title"
                    placeholder="Recipe Title"
                    value={newRecipe.title}
                    onChange={handleRecipeChange}
                    required
                />
                <textarea
                    id="recipe-instructions"
                    name="instructions"
                    placeholder="Instructions"
                    value={newRecipe.instructions}
                    onChange={handleRecipeChange}
                    required
                />
                <input
                    type="text"
                    id="recipe-ingredients"
                    name="ingredients"
                    placeholder="Ingredients (comma-separated)"
                    value={newRecipe.ingredients.join(', ')}
                    onChange={handleIngredientsChange}
                    required
                />
                <button type="submit">{isEditing ? 'Update Recipe' : 'Add Recipe'}</button>
            </form>
        </div>
    );
};

export default RecipePage;
