import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
}

const Home: React.FC = () => {
    const router = useRouter();
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

    const [userId, setUserId] = useState<string | null>(null);
    const [imageStates, setImageStates] = useState(
        images.map(() => ({ likes: 0, liked: false, loading: false, error: '' }))
    );

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [recipeIdToUpdate, setRecipeIdToUpdate] = useState<string | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]); 

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data && data.user) {
                setUserId(data.user.id);
            }
        };

        const fetchRecipes = async () => {
            const { data, error } = await supabase.from('recipes').select('*');
            if (error) {
                console.error('Failed to fetch recipes:', error.message);
            } else {
                console.log('Fetched recipes:', data);
                setRecipes(data); 
            }
        };
        fetchUser();
        fetchRecipes();
    }, []);

    const handleLike = async (index) => {
        const newImageStates = [...imageStates];
        
        // Immediate update for better user experience
        newImageStates[index].loading = true; // Show loading state
        newImageStates[index].likes += 1; // Increment likes immediately
        newImageStates[index].liked = true; // Mark as liked
        newImageStates[index].error = ''; // Clear any previous error
        setImageStates(newImageStates); // Update state

        const imageId = images[index].split('/').pop()?.split('.')[0]; 
        const userId = null; // Adjust as necessary

        try {
            const response = await fetch(`http://localhost:4000/api/likes/${imageId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
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
            newImageStates[index].error = 'Failed to like image'; 
        } finally {
            newImageStates[index].loading = false; // Stop loading state
            setImageStates(newImageStates); // Update state again
        }
    };

    const handleEditRecipe = (recipe: Recipe) => {
        setTitle(recipe.title);
        setIngredients(recipe.ingredients.join(', '));
        setInstructions(recipe.instructions);
        setRecipeIdToUpdate(recipe.id);
    };

    const handleDeleteRecipe = async (recipe: Recipe) => {
        const recipeId = recipe.id as string; 
        if (!recipeId) {
            console.error('No ID provided for deletion:', recipe);
            return;
        }

        console.log('Attempting to delete recipe with id:', recipe.id);
        
        try {
            const { data, error } = await supabase
                .from('recipes')
                .delete()
                .eq('id', recipe.id); 

            if (error) {
                throw error;
            }

            setRecipes((prevRecipes) => prevRecipes.filter(r => r.id !== recipe.id));
        } catch (error) {
            console.error('Error deleting recipe:', error.message);
            alert('Failed to delete the recipe. Please try again.');
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
    
                if (data && data.length > 0) {
                    setRecipes(prevRecipes =>
                        prevRecipes.map(recipe =>
                            recipe.id === recipeIdToUpdate ? data[0] : recipe
                        )
                    );
                }
            } else {
                const { data, error } = await supabase
                    .from('recipes')
                    .insert([{
                        title,
                        ingredients: ingredientsArray,
                        instructions,
                        author_id: userId 
                    }])
                    .select();
    
                if (error) throw error;
    
                if (data && data.length > 0) {
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
                                {imageStates[index].loading ? 'Liking...' : (imageStates[index].liked ? 'Liked' : 'Like')}
                            </button>
                        </div>
                        <p>Likes: {imageStates[index].likes}</p>
                        {imageStates[index].error && <p style={{ color: 'red' }}>{imageStates[index].error}</p>}
                    </div>
                ))}
            </div>

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Recipe Management</h2>
            <form onSubmit={handleRecipeSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                    type="text"
                    id="recipe-title"
                    name="title"
                    placeholder="Recipe Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    style={{ padding: '10px', width: '80%', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <textarea
                    id="recipe-ingredients"
                    name="ingredients"
                    placeholder="Ingredients (comma separated)"
                    value={ingredients}
                    onChange={e => setIngredients(e.target.value)}
                    required
                    style={{ padding: '10px', width: '80%', height: '100px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <textarea
                    id="recipe-instructions"
                    name="instructions"
                    placeholder="Instructions"
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    required
                    style={{ padding: '10px', width: '80%', height: '100px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        {recipeIdToUpdate ? 'Update Recipe' : 'Add Recipe'}
                    </button>
                    <button
                        type="button"
                        onClick={resetRecipeForm}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>  
                        <h3>{recipe.title}</h3>
                        <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                        <p>Instructions: {recipe.instructions}</p>
                        <button onClick={() => handleEditRecipe(recipe)}>Edit</button>
                        <button onClick={() => handleDeleteRecipe(recipe)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
