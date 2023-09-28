import { io } from 'socket.io-client';

const URL = 'http://10.0.0.98:3010';

export const socket = io(URL);
