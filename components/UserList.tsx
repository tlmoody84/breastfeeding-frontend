import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../utils/api';
import UserItem from './UserItem';
import { ApiUser } from '../utils/types';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<ApiUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError('Failed to load users');
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
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    );
};

export default UserList;
