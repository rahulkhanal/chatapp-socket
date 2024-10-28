import React, { useState, useEffect } from 'react';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    console.log(groupName, users, selectedUsers);
    useEffect(() => {
        fetch('http://localhost:3000/auth')
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: groupName, userIds: selectedUsers }),
        });

        if (response.ok) {
            alert('Group created successfully!');
        } else {
            alert('Error creating group.');
        }
    };

    const handleUserSelect = (e) => {
        const userId = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        }
    };

    return (
        <div>
            <h1>Create a New Group</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Group Name:</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <h3>Select Users to Add to Group</h3>
                    {users.map((user) => (
                        <div key={user.id}>
                            <input
                                type="checkbox"
                                value={user.id}
                                onChange={handleUserSelect}
                            />
                            <label>{user.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default CreateGroup;
