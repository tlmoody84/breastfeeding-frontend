// import { useState, useEffect } from 'react';
// import { fetchFeeds, submitFeed, fetchQuestions, submitQuestion, submitReply } from '../utils/api'; // Adjust the path as needed
// import { Feed, Question, Reply } from '../utils/types'; // Ensure Question and Reply types are imported

// const FeedsPage = () => {
//     const [feeds, setFeeds] = useState<Feed[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [newFeed, setNewFeed] = useState<{ duration: number; notes: string }>({ duration: 0, notes: '' });
    
//     // State for questions and replies
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [newQuestion, setNewQuestion] = useState<string>('');
//     const [newReply, setNewReply] = useState<{ questionId: number; content: string }>({ questionId: 0, content: '' });

//     useEffect(() => {
//         const loadFeeds = async () => {
//             try {
//                 const fetchedFeeds = await fetchFeeds();
//                 setFeeds(fetchedFeeds);
//             } catch (err) {
//                 setError('Error loading feeds');
//             }
//         };

//         const loadQuestions = async () => {
//             try {
//                 const fetchedQuestions = await fetchQuestions();
//                 setQuestions(fetchedQuestions);
//             } catch (err) {
//                 setError('Error loading questions');
//             }
//         };

//         loadFeeds();
//         loadQuestions();
//     }, []);

//     // Handle feed submission
//     const handleFeedSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const feedData = {
//             feed_time: new Date().toISOString(),
//             user_id: 1, // Example user ID
//             duration: newFeed.duration,
//             notes: newFeed.notes,
//         };

//         try {
//             const newFeedResponse = await submitFeed(feedData);
//             setFeeds([...feeds, newFeedResponse]);
//             setNewFeed({ duration: 0, notes: '' });
//         } catch (error) {
//             setError('Error submitting feed');
//         }
//     };

//     // Handle question submission
//     const handleQuestionSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const questionData = { content: newQuestion, user_id: 1 }; // Example user ID

//         try {
//             const newQuestionResponse = await submitQuestion(questionData);
//             setQuestions([...questions, newQuestionResponse]);
//             setNewQuestion('');
//         } catch (error) {
//             setError('Error submitting question');
//         }
//     };

//     // Handle reply submission
//     const handleReplySubmit = async (event: React.FormEvent, questionId: number) => {
//         event.preventDefault();
//         const replyData = { content: newReply.content, user_id: 1 }; // Example user ID

//         try {
//             const newReplyResponse = await submitReply(questionId, replyData);
//             const updatedQuestions = questions.map(question =>
//                 question.id === questionId
//                     ? { ...question, replies: [...question.replies, newReplyResponse] }
//                     : question
//             );
//             setQuestions(updatedQuestions);
//             setNewReply({ questionId: 0, content: '' }); // Reset
//         } catch (error) {
//             setError('Error submitting reply');
//         }
//     };

//     return (
//         <div>
//             <h1>Feeds</h1>
//             {error && <p>{error}</p>}
//             <form onSubmit={handleFeedSubmit}>
//                 <input
//                     type="number"
//                     value={newFeed.duration}
//                     onChange={(e) => setNewFeed({ ...newFeed, duration: Number(e.target.value) })}
//                     placeholder="Duration (minutes)"
//                     required
//                 />
//                 <textarea
//                     value={newFeed.notes}
//                     onChange={(e) => setNewFeed({ ...newFeed, notes: e.target.value })}
//                     placeholder="Notes"
//                 />
//                 <button type="submit">Submit Feed</button>
//             </form>

//             <h2>Questions</h2>
//             <form onSubmit={handleQuestionSubmit}>
//                 <input
//                     type="text"
//                     value={newQuestion}
//                     onChange={(e) => setNewQuestion(e.target.value)}
//                     placeholder="Ask a question"
//                     required
//                 />
//                 <button type="submit">Submit Question</button>
//             </form>

//             <ul>
//                 {feeds.map(feed => (
//                     <li key={feed.id}>
//                         <h3>{`User ID: ${feed.user_id} logged a feed`}</h3>
//                         <p>{`Duration: ${feed.duration} minutes`}</p>
//                         <p>{`Notes: ${feed.notes || 'No notes available'}`}</p>
//                     </li>
//                 ))}
//             </ul>

//             <h3>All Questions</h3>
//             <ul>
//                 {questions.map(question => (
//                     <li key={question.id}>
//                         <p>{`User ID: ${question.user_id} asked: ${question.content}`}</p>
//                         <ul>
//                             {question.replies.map(reply => (
//                                 <li key={reply.id}>
//                                     <p>{`User ID: ${reply.user_id} replied: ${reply.content}`}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                         <form onSubmit={(e) => handleReplySubmit(e, question.id)}>
//                             <input
//                                 type="text"
//                                 value={newReply.questionId === question.id ? newReply.content : ''}
//                                 onChange={(e) => setNewReply({ questionId: question.id, content: e.target.value })}
//                                 placeholder="Reply"
//                                 required
//                             />
//                             <button type="submit">Submit Reply</button>
//                         </form>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FeedsPage;

















// import { useState, useEffect } from 'react';
// import { fetchFeeds, submitFeed, fetchQuestions, submitQuestion, submitReply } from '../utils/api'; // Adjust the path as needed
// import { Feed, Question, Reply } from '../utils/types'; // Ensure Question and Reply types are imported

// const FeedsPage = () => {
//     const [feeds, setFeeds] = useState<Feed[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [newFeed, setNewFeed] = useState<{ duration: number; notes: string }>({ duration: 0, notes: '' });
    
//     // State for questions and replies
//     const [questions, setQuestions] = useState<Question[]>([]);
//     const [newQuestion, setNewQuestion] = useState<string>('');
//     const [newReply, setNewReply] = useState<{ questionId: number; content: string }>({ questionId: 0, content: '' });

//     useEffect(() => {
//         const loadFeeds = async () => {
//             try {
//                 const fetchedFeeds = await fetchFeeds();
//                 setFeeds(fetchedFeeds);
//             } catch (err) {
//                 setError('Error loading feeds');
//             }
//         };

//         const loadQuestions = async () => {
//             try {
//                 const fetchedQuestions = await fetchQuestions();
//                 setQuestions(fetchedQuestions);
//             } catch (err) {
//                 setError('Error loading questions');
//             }
//         };

//         loadFeeds();
//         loadQuestions();
//     }, []);

//     // Handle feed submission
//     const handleFeedSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const feedData = {
//             feed_time: new Date().toISOString(),
//             user_id: 1, // Example user ID
//             duration: newFeed.duration,
//             notes: newFeed.notes,
//         };

//         try {
//             const newFeedResponse = await submitFeed(feedData);
//             setFeeds([...feeds, newFeedResponse]);
//             setNewFeed({ duration: 0, notes: '' });
//         } catch (error) {
//             setError('Error submitting feed');
//         }
//     };

//     // Handle question submission
//     const handleQuestionSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const questionData = { content: newQuestion, user_id: 1 }; // Example user ID

//         try {
//             const newQuestionResponse = await submitQuestion(questionData);
//             setQuestions([...questions, newQuestionResponse]);
//             setNewQuestion('');
//         } catch (error) {
//             setError('Error submitting question');
//         }
//     };

//     // Handle reply submission
//     const handleReplySubmit = async (event: React.FormEvent, questionId: number) => {
//         event.preventDefault();
//         const replyData = { content: newReply.content, user_id: 1 }; // Example user ID

//         try {
//             const newReplyResponse = await submitReply(questionId, replyData);
//             const updatedQuestions = questions.map(question =>
//                 question.id === questionId
//                     ? { ...question, replies: [...question.replies, newReplyResponse] }
//                     : question
//             );
//             setQuestions(updatedQuestions);
//             setNewReply({ questionId: 0, content: '' }); // Reset
//         } catch (error) {
//             setError('Error submitting reply');
//         }
//     };

//     return (
//         <div>
//             <h1>Feeds</h1>
//             {error && <p>{error}</p>}

//             {/* Add your rainbow image here */}
//             <img 
//                 src="https://unsplash.com/photos/woman-breastfeeding-baby-G-WvW0yIPA4" 
//                 alt="Breastfeeding"
//                 style={{ maxWidth: '100%', height: 'auto' }}
//             />

// <form onSubmit={handleFeedSubmit}>
//     <input
//         type="number"
//         value={newFeed.duration || ''} // Ensure it's an empty string if undefined
//         onChange={(e) => setNewFeed({ ...newFeed, duration: Number(e.target.value) })}
//         placeholder="Duration (minutes)"
//         required
//     />
//     <textarea
//         value={newFeed.notes}
//         onChange={(e) => setNewFeed({ ...newFeed, notes: e.target.value })}
//         placeholder="Notes"
//     />
//     <button type="submit">Submit Feed</button>
// </form>


//             <h2>Questions</h2>
//             <form onSubmit={handleQuestionSubmit}>
//                 <input
//                     type="text"
//                     value={newQuestion}
//                     onChange={(e) => setNewQuestion(e.target.value)}
//                     placeholder="Ask a question"
//                     required
//                 />
//                 <button type="submit">Submit Question</button>
//             </form>

//             <ul>
//                 {feeds.map(feed => (
//                     <li key={feed.id}>
//                         <h3>{`User ID: ${feed.user_id} logged a feed`}</h3>
//                         <p>{`Duration: ${feed.duration} minutes`}</p>
//                         <p>{`Notes: ${feed.notes || 'No notes available'}`}</p>
//                     </li>
//                 ))}
//             </ul>

//             <h3>All Questions</h3>
//             <ul>
//                 {questions.map(question => (
//                     <li key={question.id}>
//                         <p>{`User ID: ${question.user_id} asked: ${question.content}`}</p>
//                         <ul>
//                             {question.replies.map(reply => (
//                                 <li key={reply.id}>
//                                     <p>{`User ID: ${reply.user_id} replied: ${reply.content}`}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                         <form onSubmit={(e) => handleReplySubmit(e, question.id)}>
//                             <input
//                                 type="text"
//                                 value={newReply.questionId === question.id ? newReply.content : ''}
//                                 onChange={(e) => setNewReply({ questionId: question.id, content: e.target.value })}
//                                 placeholder="Reply"
//                                 required
//                             />
//                             <button type="submit">Submit Reply</button>
//                         </form>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default FeedsPage;










import { useState, useEffect } from 'react';
import { fetchFeeds, submitFeed, fetchQuestions, submitQuestion, submitReply } from '../utils/api'; // Adjust the path as needed
import { Feed, Question, Reply } from '../utils/types'; // Ensure Question and Reply types are imported

const FeedsPage = () => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newFeed, setNewFeed] = useState<{ duration: number; notes: string }>({ duration: 0, notes: '' });
    
    // State for questions and replies
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newReply, setNewReply] = useState<{ questionId: number; content: string }>({ questionId: 0, content: '' });

    useEffect(() => {
        const loadFeeds = async () => {
            try {
                const fetchedFeeds = await fetchFeeds();
                setFeeds(fetchedFeeds);
            } catch (err) {
                setError('Error loading feeds');
            }
        };

        const loadQuestions = async () => {
            try {
                const fetchedQuestions = await fetchQuestions();
                setQuestions(fetchedQuestions);
            } catch (err) {
                setError('Error loading questions');
            }
        };

        loadFeeds();
        loadQuestions();
    }, []);

    // Handle feed submission
    const handleFeedSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const feedData = {
            feed_time: new Date().toISOString(),
            user_id: 1, // Example user ID
            duration: newFeed.duration,
            notes: newFeed.notes,
        };

        try {
            const newFeedResponse = await submitFeed(feedData);
            setFeeds([...feeds, newFeedResponse]);
            setNewFeed({ duration: 0, notes: '' });
        } catch (error) {
            setError('Error submitting feed');
        }
    };

    // Handle question submission
    const handleQuestionSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const questionData = { content: newQuestion, user_id: 1 }; // Example user ID

        try {
            const newQuestionResponse = await submitQuestion(questionData);
            setQuestions([...questions, newQuestionResponse]);
            setNewQuestion('');
        } catch (error) {
            setError('Error submitting question');
        }
    };

    // Handle reply submission
    const handleReplySubmit = async (event: React.FormEvent, questionId: number) => {
        event.preventDefault();
        const replyData = { content: newReply.content, user_id: 1 }; // Example user ID

        try {
            const newReplyResponse = await submitReply(questionId, replyData);
            const updatedQuestions = questions.map(question =>
                question.id === questionId
                    ? { ...question, replies: [...(question.replies || []), newReplyResponse] }
                    : question
            );
            setQuestions(updatedQuestions);
            setNewReply({ questionId: 0, content: '' }); // Reset
        } catch (error) {
            setError('Error submitting reply');
        }
    };

    return (
        <div>
            <h1>Feeds</h1>
            {error && <p>{error}</p>}

            {/* Add your rainbow image here */}
            <img 
                src="https://images.unsplash.com/photo-1501575061507-1e0e3c2a1528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-4.0.3&q=80&w=400" 
                alt="Breastfeeding"
                style={{ maxWidth: '100%', height: 'auto' }}
            />

            <form onSubmit={handleFeedSubmit}>
                <input
                    type="number"
                    value={newFeed.duration || ''} // Ensure it's an empty string if undefined
                    onChange={(e) => setNewFeed({ ...newFeed, duration: Number(e.target.value) })}
                    placeholder="Duration (minutes)"
                    required
                />
                <textarea
                    value={newFeed.notes}
                    onChange={(e) => setNewFeed({ ...newFeed, notes: e.target.value })}
                    placeholder="Notes"
                />
                <button type="submit">Submit Feed</button>
            </form>

            <h2>Questions</h2>
            <form onSubmit={handleQuestionSubmit}>
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask a question"
                    required
                />
                <button type="submit">Submit Question</button>
            </form>

            <ul>
                {feeds.map(feed => (
                    <li key={feed.id}>
                        <h3>{`User ID: ${feed.user_id} logged a feed`}</h3>
                        <p>{`Duration: ${feed.duration} minutes`}</p>
                        <p>{`Notes: ${feed.notes || 'No notes available'}`}</p>
                    </li>
                ))}
            </ul>

            <h3>All Questions</h3>
            <ul>
                {questions.map(question => (
                    <li key={question.id}>
                        <p>{`User ID: ${question.user_id} asked: ${question.content}`}</p>
                        <ul>
                            {question.replies && question.replies.length > 0 ? (
                                question.replies.map(reply => (
                                    <li key={reply.id}>
                                        <p>{`User ID: ${reply.user_id} replied: ${reply.content}`}</p>
                                    </li>
                                ))
                            ) : (
                                <li>No replies available</li> // Optionally display a message if no replies
                            )}
                        </ul>
                        <form onSubmit={(e) => handleReplySubmit(e, question.id)}>
                            <input
                                type="text"
                                value={newReply.questionId === question.id ? newReply.content : ''}
                                onChange={(e) => setNewReply({ questionId: question.id, content: e.target.value })}
                                placeholder="Reply"
                                required
                            />
                            <button type="submit">Submit Reply</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeedsPage;
