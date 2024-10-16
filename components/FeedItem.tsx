import React from 'react';

import { Feed } from '../utils/types';

interface FeedItemProps {
    feed: Feed;
}

const FeedItem: React.FC<FeedItemProps> = ({ feed }) => {
    return (
        <div>
            <h2>{feed.title}</h2>
            <p>{feed.content}</p>
        </div>
    );
};

export default FeedItem;
