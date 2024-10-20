import React, { FormEvent, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
}

const RecipeForm: React.FC<{
    title: string;
    ingredients: string;
    instructions: string;
    recipeIdToUpdate: string | null;
    setTitle: (title: string) => void;
    setIngredients: (ingredients: string) => void;
    setInstructions: (instructions: string) => void;
    onSubmit: (e: FormEvent) => void;
    onCancel: () => void;
}> = ({ title, ingredients, instructions, recipeIdToUpdate, setTitle, setIngredients, setInstructions, onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{ padding: '10px', width: '80%', margin: '10px 0' }}
        />
        <textarea
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            required
            style={{ padding: '10px', width: '80%', height: '100px', margin: '10px 0' }}
        />
        <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            required
            style={{ padding: '10px', width: '80%', height: '100px', margin: '10px 0' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white' }}>
                {recipeIdToUpdate ? 'Update Recipe' : 'Add Recipe'}
            </button>
            <button type="button" onClick={onCancel} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white' }}>
                Cancel
            </button>
        </div>
    </form>
);

const RecipeList: React.FC<{
    recipes: Recipe[];
    onEdit: (recipe: Recipe) => void;
    onDelete: (recipe: Recipe) => void;
}> = ({ recipes, onEdit, onDelete }) => (
    <ul>
        {recipes.map((recipe) => (
            <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>Instructions: {recipe.instructions}</p>
                <button onClick={() => onEdit(recipe)}>Edit</button>
                <button onClick={() => onDelete(recipe)}>Delete</button>
            </li>
        ))}
    </ul>
);

const Home: React.FC = () => {
    const images = [
        '/images/breastfeeding1.jpg',
        '/images/breastfeeding2.jpg',
        '/images/breastfeeding3.jpg',
        '/images/breastfeeding4.jpg',
        '/images/breastfeeding5.jpg',
        '/images/breastfeeding6.jpg',
        '/images/breastfeeding7.jpg',
        '/images/breastfeeding8.jpg',
        '/images/breastfeeding9.jpg',
        '/images/breastfeeding10.jpg',
    ];

    const [imageStates, setImageStates] = useState(images.map(() => ({ likes: 0, likedBy: new Set<string>(), loading: false, error: '' })));
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [recipeIdToUpdate, setRecipeIdToUpdate] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const { data, error } = await supabase.from('recipes').select('*');
            if (error) console.error('Failed to fetch recipes:', error.message);
            else setRecipes(data);
        };

        fetchRecipes();
    }, []);

    const handleLike = async (index: number) => {
        const newImageStates = [...imageStates];
        const tempUserId = Math.random().toString(36).substr(2, 9); 

        if (newImageStates[index].likedBy.has(tempUserId)) {
            alert('You have already liked this image!');
            return;
        }

        newImageStates[index].loading = true; 
        newImageStates[index].likes += 1; 
        newImageStates[index].likedBy.add(tempUserId); 
        newImageStates[index].error = ''; 
        setImageStates(newImageStates); 

        const imageId = images[index].split('/').pop()?.split('.')[0];

        try {
            const response = await fetch(`http://localhost:4000/api/likes/${imageId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: tempUserId }),
            });

            if (!response.ok) {
                throw new Error('Error liking image');
            }

            const data = await response.json();
            console.log('Like successful:', data);
        } catch (error) {
            console.error('Error handling like:', error);
            // Reset the likes count if the like operation fails
            newImageStates[index].likes -= 1;
            newImageStates[index].likedBy.delete(tempUserId); 
            newImageStates[index].error = 'Failed to like image'; 
        } finally {
            newImageStates[index].loading = false; 
            setImageStates(newImageStates); 
        }
    };

    const resetRecipeForm = () => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        setRecipeIdToUpdate(null);
    };

    const handleRecipeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(Boolean);

        try {
            if (recipeIdToUpdate) {
                const { data, error } = await supabase
                    .from('recipes')
                    .update({ title, ingredients: ingredientsArray, instructions })
                    .eq('id', recipeIdToUpdate)
                    .select();

                if (error) throw error;

                if (data) {
                    setRecipes(prevRecipes =>
                        prevRecipes.map(recipe =>
                            recipe.id === recipeIdToUpdate ? data[0] : recipe
                        )
                    );
                }
            } else {
                const { data, error } = await supabase
                    .from('recipes')
                    .insert([{ title, ingredients: ingredientsArray, instructions }])
                    .select();

                if (error) throw error;

                if (data) {
                    setRecipes(prevRecipes => [...prevRecipes, ...data]);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again.');
        } finally {
            resetRecipeForm();
        }
    };

    const handleEditRecipe = (recipe: Recipe) => {
        setTitle(recipe.title);
        setIngredients(recipe.ingredients.join(', '));
        setInstructions(recipe.instructions);
        setRecipeIdToUpdate(recipe.id);
    };

    const handleDeleteRecipe = async (recipe: Recipe) => {
        try {
            const { error } = await supabase
                .from('recipes')
                .delete()
                .eq('id', recipe.id);

            if (error) throw error;

            setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== recipe.id));
        } catch (error) {
            console.error('Error deleting recipe:', error.message);
            alert('Failed to delete recipe. Please try again.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Breastfeeding App</h1>
            <h2>Like Your Favorite Nursing Mom</h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {images.map((src, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <img src={src} alt={`Nursing Position ${index + 1}`} style={{ width: '200px', borderRadius: '10px' }} />
                        <div>
                            <button onClick={() => handleLike(index)} disabled={imageStates[index].loading}>
                                {imageStates[index].loading ? 'Liking...' : 'Like'}
                            </button>
                        </div>
                        <p>Likes: {imageStates[index].likes}</p>
                        {imageStates[index].error && <p style={{ color: 'red' }}>{imageStates[index].error}</p>}
                    </div>
                ))}
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Recipe Management</h2>
            <RecipeForm
                title={title}
                ingredients={ingredients}
                instructions={instructions}
                recipeIdToUpdate={recipeIdToUpdate}
                setTitle={setTitle}
                setIngredients={setIngredients}
                setInstructions={setInstructions}
                onSubmit={handleRecipeSubmit}
                onCancel={resetRecipeForm}
            />

            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Recipes</h2>
            <RecipeList recipes={recipes} onEdit={handleEditRecipe} onDelete={handleDeleteRecipe} />
        </div>
    );
};

export default Home;
