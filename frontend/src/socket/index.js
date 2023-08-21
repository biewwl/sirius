import { io } from 'socket.io-client';

const URL = 'http://localhost:3010';

export const socket = io(URL);
