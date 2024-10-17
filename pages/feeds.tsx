import { useState, useEffect } from 'react';
import { fetchFeeds } from '../utils/api'; 
import { Feed } from '../utils/types'; 

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
        <div className="feeds-container">
            <h2 className="section-title">My Feeds</h2>
            {error && <p>{error}</p>}

            <ul>
                {feeds.map(feed => (
                    <li key={feed.id} className="feed-item">
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
