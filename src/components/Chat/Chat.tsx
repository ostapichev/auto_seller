import { FC, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface ChatMessage {
    id: string;
    text: string;
}

const Chat: FC = () => {
    const [socket, setSocket] = useState<typeof Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState<string>('');
    const sendMessage = () => {
        if (socket && input) {
            socket.emit('message', input); // Отправка сообщения на сервер
            setInput(''); // Очистка поля ввода после отправки
        }
    };
    useEffect(() => {
        const newSocket = io('http://localhost:3500', {
            path: '/socket/message',
            transports: ['websocket'],
        });
        setSocket(newSocket);
        newSocket.on('message', (message: string) => {
            const newMessage: ChatMessage = {
                id: new Date().toISOString(),
                text: message,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg: ChatMessage, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export {
    Chat
};
