import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
import { ApiUser } from '../utils/types';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data: ApiUser[] = await fetchUsers();
                console.log('Fetched users:', data); // Log the data received
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setUsers([]); // Reset to empty array if not valid
                }
            } catch (err) {
                console.error('Error loading users:', err);
                setError('Failed to load users'); // Update error state
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Users</h1>
            {users.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.email}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersPage;
