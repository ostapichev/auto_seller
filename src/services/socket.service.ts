import {baseURL, urls} from "../constants";
import io, {Socket} from "socket.io-client";

class SocketService {
    public socketConnect(): typeof Socket {
        return io(baseURL, {
            path: `${urls.socketAPI.socket}`,
            transports: ['websocket'],
        });
    };
}

export const socketService = new SocketService();
