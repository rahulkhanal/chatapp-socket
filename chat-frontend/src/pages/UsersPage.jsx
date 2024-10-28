import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch('http://localhost:3000/auth')  // Adjust endpoint if necessary
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Fetch groups
    fetch('http://localhost:3000/groups')  // Ensure this endpoint is correct
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  return (
    <div className="users-container">
      <h1>All Registered Users</h1>
      <Link to="/create-group">Create Group</Link>
      
      <div className="users-list">
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>

      <div className="groups-list">
        <h2>Groups</h2>
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <p>Members: {group.users.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
