import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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

    const [userId, setUserId] = useState<string | null>(null);
    const [imageStates, setImageStates] = useState(
        images.map(() => ({ likes: 0, liked: false, loading: false, error: '' }))
    );

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            if (data && data.user) {
                setUserId(data.user.id);
            }
        };
        fetchUser();
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
            }, 2000); // Reset after 2 seconds (or any time you prefer)

        } catch (error) {
            console.error('Error handling like:', error);
            newImageStates[index].error = 'Failed to like image';
        } finally {
            newImageStates[index].loading = false;
            setImageStates(newImageStates);
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
                            <button 
                                onClick={() => handleLike(index)} 
                                disabled={imageStates[index].loading}
                            >
                                {imageStates[index].loading ? 'Liking...' : (imageStates[index].liked ? 'Liked' : 'Like')}
                            </button>
                        </div>
                        <p>Likes: {imageStates[index].likes}</p>
                        {imageStates[index].error && <p style={{ color: 'red' }}>{imageStates[index].error}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
