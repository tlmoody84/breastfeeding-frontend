// import { useState, useEffect } from 'react';
// import { fetchFeeds } from '../../utils/api'; 
// import { Feed } from '../../utils/types'; 
// import React from 'react';

// const FeedsPage = () => {
//     const [feeds, setFeeds] = useState<Feed[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadFeeds = async () => {
//             try {
//                 const fetchedFeeds = await fetchFeeds();
//                 setFeeds(fetchedFeeds);
//             } catch (err) {
//                 setError('Error loading feeds');
//             }
//         };

//         loadFeeds();
//     }, []);

//     return (
//         <div className="feeds-container">
//             <h2 className="section-title">My Feeds</h2>
//             {error && <p>{error}</p>}

//             <ul>
//                 {feeds.map(feed => (
//                     <li key={feed.id} className="feed-item">
//                         <h3>{`User ID: ${feed.user_id} logged a feed`}</h3>
//                         <p>{`Duration: ${feed.duration} minutes`}</p>
//                         <p>{`Notes: ${feed.notes || 'No notes available'}`}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FeedsPage;








import { useState, useEffect } from 'react';
import { fetchFeeds } from '../../utils/api'; 
import { Feed } from '../../utils/types'; 
import React from 'react';

const FeedsPage = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const fetchedFeeds = await fetchFeeds();
                setFeeds(fetchedFeeds);
            } catch (err) {
                setError(err.message || 'Error loading feeds');
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        loadFeeds();
    }, []);

    return (
        <div className="feeds-container">
            <h2 className="section-title">My Feeds</h2>
            {loading && <p>Loading feeds...</p>} {/* Show loading message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

            <ul>
                {feeds.length === 0 && !loading && <p>No feeds available.</p>} {/* Handle empty state */}
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
