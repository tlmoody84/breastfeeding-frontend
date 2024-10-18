import { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
import { ApiUser } from '../utils/types';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data: ApiUser[] = await fetchUsers();
                console.log('Fetched users:', data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array but got:', data);
                    setUsers([]);
                }
            } catch (err) {
                console.error('Error loading users:', err);
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Users</h1>
            <input
                type="text"
                placeholder="Search users by email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {filteredUsers.length === 0 ? (
                <p>No users available.</p>
            ) : (
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user.id} className="user-item">
                            {user.name} <span>({user.email})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersPage;
