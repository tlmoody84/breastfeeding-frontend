import { useState, useEffect } from 'react';
import { fetchFeeds, fetchQuestions } from '../utils/api'; 
import { Feed, Question } from '../utils/types'; 

const FeedsPage = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const fetchedFeeds = await fetchFeeds();
                setFeeds(fetchedFeeds);
            } catch (err) {
                setError('Error loading feeds');
            }
        };

        loadFeeds();
    }, []);

    return (
        <div>
            <h1>Feeds</h1>
            {error && <p>{error}</p>}

            {/* <img 
                src="https://images.unsplash.com/photo-1501575061507-1e0e3c2a1528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&q=80&w=400" 
                alt="Breastfeeding"
                style={{ maxWidth: '100%', height: 'auto' }}
            /> */}

            <ul>
                {feeds.map(feed => (
                    <li key={feed.id}>
                        <h3>{`User ID: ${feed.user_id} logged a feed`}</h3>
                        <p>{`Duration: ${feed.duration} minutes`}</p>
                        <p>{`Notes: ${feed.notes || 'No notes available'}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedsPage;
