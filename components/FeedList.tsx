import React, { useEffect, useState } from 'react';
import { fetchFeeds } from '../utils/api';
import FeedItem from './FeedItem';
import { Feed } from '../utils/types';

const FeedList: React.FC = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(true);
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
            {feeds.map(feed => (
                <FeedItem key={feed.id} feed={feed} />
            ))}
        </div>
    );
};

export default FeedList;