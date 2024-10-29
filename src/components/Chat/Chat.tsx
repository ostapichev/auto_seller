import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { IChatMessage } from "../../inteerfaces";
import { IFuncVoid } from "../../types";
import { socketService } from "../../services";

const Chat: FC = () => {
    const [socket, setSocket] = useState<typeof Socket | null>(null);
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const [input, setInput] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const joinRoom: IFuncVoid = () => {
        if (socket && room) {
            socket.emit('joinRoom', room);
        }
    };
    const sendMessage:IFuncVoid = () => {
        if (socket && input && room) {
            socket.emit('message', { room, message: input });
            setInput('');
        }
    };
    useEffect(() => {
        const newSocket: typeof Socket = socketService.socketConnect();
        setSocket(newSocket);
        newSocket.on('joinedRoom', (room: string) => {
            console.log(`Joined room: ${room}`);
        });
        newSocket.on('message', (data: IChatMessage) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <div>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room name"
                />
                <button onClick={joinRoom}>Join Room</button>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}</strong>: {msg.message}
                    </div>
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
