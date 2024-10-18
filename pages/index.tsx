import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

// Define a Recipe interface
interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string;
    author_id: string | null; // Change to null if allowing anonymous submissions
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
    const [recipes, setRecipes] = useState<Recipe[]>([]); // State for storing recipes

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

    const handleLike = async (index: number) => {
        const newImageStates = [...imageStates];
        newImageStates[index].loading = true;
        setImageStates(newImageStates);
        
        const imageId = images[index].split('/').pop()?.split('.')[0];
        const anonId = userId ? null : `anon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            const response = await fetch(`http://localhost:4000/api/likes/${imageId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-anon-id': anonId || undefined,
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (!response.ok) {
                throw new Error('Error liking image');
            }

            const data = await response.json();
            console.log('Like successful:', data);
            newImageStates[index].likes += 1; // Increment likes count
            newImageStates[index].liked = true; // Mark as liked
            newImageStates[index].error = '';

            // Optional: Reset the like state after a delay
            setTimeout(() => {
                newImageStates[index].liked = false; // Allow to like again
                setImageStates(newImageStates);
            }, 2000); // Reset after 2 seconds

        } catch (error) {
            console.error('Error handling like:', error);
            newImageStates[index].error = 'Failed to like image';
        } finally {
            newImageStates[index].loading = false;
            setImageStates(newImageStates);
        }
    };

    const handleEditRecipe = (recipe: Recipe) => {
        setTitle(recipe.title);
        setIngredients(recipe.ingredients.join(', '));
        setInstructions(recipe.instructions);
        setRecipeIdToUpdate(recipe.id);
    };

    const handleDeleteRecipe = async (recipe: Recipe) => {
        if (!recipe) {
            console.error('No recipe provided for deletion');
            return;
        }
    
        console.log('Attempting to delete recipe with id:', recipe.id);
        
        if (!recipe.id) {
            console.error('No ID provided for deletion');
            return;
        }
    
        try {
            const { data, error } = await supabase
                .from('recipes')
                .delete()
                .eq('id', recipe.id); // Ensure you're using recipe.id here
    
            if (error) {
                throw error; // Throw error if deletion fails
            }
    
            // Update state to remove the deleted recipe
            setRecipes((prevRecipes) => prevRecipes.filter(r => r.id !== recipe.id));
        } catch (error) {
            console.error('Error deleting recipe:', error.message);
            alert('Failed to delete the recipe. Please try again.');
        }
    };
    

    const handleRecipeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const ingredientsArray = ingredients.split(',').map(item => item.trim()).filter(Boolean);

        try {
            if (recipeIdToUpdate) {
                // Update recipe
                const { data, error } = await supabase
                    .from('recipes')
                    .update({ title, ingredients: ingredientsArray, instructions })
                    .eq('id', recipeIdToUpdate)
                    .select();

                if (error) throw error;

                // Update local state with the edited recipe
                if (data && Array.isArray(data) && data.length > 0) {
                    setRecipes((prevRecipes) =>
                        prevRecipes.map(recipe =>
                            recipe.id === recipeIdToUpdate ? (data[0] as unknown as Recipe) : recipe
                        )
                    );
                }
            } else {
                // Create new recipe
                const { data, error } = await supabase
                    .from('recipes')
                    .insert([{
                        title,
                        ingredients: ingredientsArray,
                        instructions,
                        author_id: null // Allow submission without authentication
                    }])
                    .select();

                if (error) throw error;

                if (data && Array.isArray(data) && data.length > 0) {
                    const newRecipes = data.map(item => item as unknown as Recipe);
                    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again.');
        } finally {
            resetRecipeForm();
        }
    };

    const resetRecipeForm = () => {
        setTitle('');
        setIngredients('');
        setInstructions('');
        setRecipeIdToUpdate(null);
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
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {recipeIdToUpdate ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <button type="button" onClick={resetRecipeForm} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Cancel
        </button>
    </div>
</form>


            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Recipes</h2>
            <ul>
    {recipes.map(recipe => (
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
