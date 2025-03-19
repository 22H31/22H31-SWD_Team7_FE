import React, { useState, useEffect } from 'react';
import { Input, List, Avatar, Button } from 'antd';
import Ably from 'ably';

const { TextArea } = Input;

// Initialize Ably with API key
const ably = new Ably.Realtime({ key: 'QvHvDg.dalCQw:kTFjhV-SdqvDWwGAYws9uNp3QPK2VwYVP92uBoK-qD0' });
const channel = ably.channels.get('chat');

const ChatUser = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const userName = "user"; // Thay bằng ID hoặc tên user thực tế

    useEffect(() => {
        // Load history from localStorage if available
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        setMessages(savedMessages);

        channel.subscribe((msg) => {
            // Chỉ hiển thị tin nhắn mà user này gửi hoặc nhận từ admin
            if (msg.data.sender === userName || msg.data.recipient === userName) {
                setMessages((prev) => {
                    const newMessages = [...prev, msg];
                    // Save messages to localStorage
                    localStorage.setItem('chatMessages', JSON.stringify(newMessages));
                    return newMessages;
                });
            }
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const sendMessage = () => {
        const messageData = { text: input, sender: userName, recipient: 'admin' };

        // Gửi tin nhắn qua Ably mà không thêm vào UI tại đây
        channel.publish('message', messageData);

        // Chỉ thêm tin nhắn vào UI khi nhận được phản hồi từ Ably
        setInput('');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ flex: 1, overflowY: 'scroll', padding: '10px' }}>
                <List
                    dataSource={messages}
                    renderItem={(item) => (
                        <List.Item style={{ textAlign: item.data.sender === userName ? 'right' : 'left' }}>
                            <List.Item.Meta
                                title={item.data.sender}
                                description={item.data.text}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
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
        </div>
    );
};

export default ChatUser;