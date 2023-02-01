import io from "socket.io-client";
export const socket = io.connect('http://localhost:5000', {query: 'user_data='+localStorage.getItem('user_data') });
