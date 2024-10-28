import React, { useEffect, useState } from 'react';
import axios from 'axios'

const UserList = ({ users, onUserSelect, selectedUser }) => {
    return (
        <div className="user-list">
            <div className="user-list__header">Users</div>
            <ul className="user-list__items">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className={`user-list__item ${selectedUser === user.id ? 'active' : ''}`}
                        onClick={() => onUserSelect(user.id)}
                    >
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Conversation = ({ user, messages }) => {
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        setInput('');
    };

    return (
        <div className="conversation">
            <div className="conversation__header">Conversation with {user.name}</div>
            <div className="conversation__messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-view">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};


const MessegeUser = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const messages = [
        { text: 'Hello!', type: 'receive' },
        { text: 'Hi there!', type: 'send' },
        { text: 'How are you?', type: 'receive' },
        { text: 'I’m good, thanks! And you?', type: 'send' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/user');
                setUsers(response.data); // Assuming the response data is an array of users
            } catch (err) {
                console.log(err);
            } finally {
            }
        };

        fetchData();
    }, []); 
    console.log(users);
    return (
        <>
            <div className="container">
                <UserList users={users} onUserSelect={setSelectedUser} selectedUser={selectedUser} />
                {selectedUser && (
                    <Conversation user={users.find(u => u.id === selectedUser)} messages={messages} />
                )}
            </div>
            <br />
            <br />
            <center>
                <button className="">Group</button>
            </center>
        </>
    );
}

export default MessegeUser