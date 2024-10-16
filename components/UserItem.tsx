import React from 'react';
import { ApiUser } from '../utils/types';

interface UserItemProps {
    user: ApiUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
    return <div>{user.email}</div>;
};

export default UserItem;
