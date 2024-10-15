// pages/feeds.tsx
import { useEffect, useState } from 'react';
import { fetchFeeds } from '../utils/api';

interface Feed {
    id: number;
    content: string;
}

const FeedsPage: React.FC = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const data = await fetchFeeds();
                setFeeds(data);
            } catch (err) {
                setError('Failed to load feeds');
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
            <ul>
                {feeds.map((feed) => (
                    <li key={feed.id}>{feed.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default FeedsPage;
