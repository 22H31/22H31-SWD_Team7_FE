import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Button, notification } from 'antd';
import Ably from 'ably';

const { TextArea } = Input;

// Initialize Ably with API key
const ably = new Ably.Realtime({ key: 'QvHvDg.dalCQw:kTFjhV-SdqvDWwGAYws9uNp3QPK2VwYVP92uBoK-qD0' });
const channel = ably.channels.get('chat');

const ChatAdmin = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
        // Load history from localStorage if available
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(savedMessages);

        channel.subscribe((msg) => {
            setMessages((prev) => {
                const newMessages = [...prev, msg];
                // Save messages to localStorage
                localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                return newMessages;
            });
            
            // Show notification for new message from a user
            if (msg.data.recipient === 'admin') {
                notification.info({
                    message: `New message from ${msg.data.sender}`,
                    description: msg.data.text,
                });
            }
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    // Filter messages for the selected user
    const filteredMessages = selectedUser 
        ? messages.filter(msg => (msg.data.sender === selectedUser && msg.data.recipient === 'admin') || (msg.data.sender === 'admin' && msg.data.recipient === selectedUser))
        : [];

    const sendMessage = () => {
        if (selectedUser) {
            const messageData = { text: input, sender: 'admin', recipient: selectedUser };
            
            // Publish message to Ably
            channel.publish('message', messageData);

            // Do not add the message to UI immediately to avoid duplication
            setInput('');
        }
    };

    // Get list of users who have sent messages to admin
    const users = Array.from(new Set(messages.filter(msg => msg.data.recipient === 'admin').map(msg => msg.data.sender)));

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '30%', borderRight: '1px solid #ddd', padding: '10px' }}>
                <h3>Users</h3>
                <List
                    bordered
                    dataSource={users}
                    renderItem={(user) => (
                        <List.Item onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer', background: selectedUser === user ? '#f0f0f0' : '#fff' }}>
                            <List.Item.Meta
                                title={user}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ width: '70%', padding: '20px' }}>
                <h3>Chat with {selectedUser || 'Select a user'}</h3>
                <div style={{ height: '80%', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                    {filteredMessages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '10px', textAlign: msg.data.sender === 'admin' ? 'right' : 'left' }}>
                            <span style={{ marginLeft: '10px', background: msg.data.sender === 'admin' ? '#DCF8C6' : '#FFF', padding: '5px', borderRadius: '5px', display: 'inline-block' }}>
                                {msg.data.text} 
                            </span>
                        </div>
                    ))}
                </div>
                {selectedUser && (
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <TextArea
                            rows={2}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                        />
                        <Button type="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
                            Send
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatAdmin;