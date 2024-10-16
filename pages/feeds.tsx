import { useEffect, useState } from 'react';
import { fetchFeeds } from '../utils/api';
import { Feed } from '../utils/types';

const FeedsPage: React.FC = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const data: Feed[] = await fetchFeeds();
                console.log('Fetched feeds:', data); // Log the data received
                if (Array.isArray(data)) {
                    setFeeds(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setFeeds([]); // Reset to empty array if not valid
                }
            } catch (err) {
                console.error('Error loading feeds:', err);
                setError('Failed to load feeds'); // Update error state
            } finally {
                setLoading(false);
            }
        };

        loadFeeds();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Feeds</h1>
            {feeds.length === 0 ? (
                <p>No feeds available.</p>
            ) : (
                <ul>
                    {feeds.map(feed => (
                        <li key={feed.id}>
                            <h2>{feed.title}</h2>
                            <p>{feed.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedsPage;
