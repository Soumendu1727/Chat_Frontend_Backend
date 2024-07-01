import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
});

let users = [];

const addUser = (userData, socketId) => {
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
        console.log('User added:', { ...userData, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
    console.log('User removed:', socketId);
};

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
};

io.on('connection', (socket) => {
    console.log('user connected');

    // Connect
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    // Send message
    socket.on('sendMessage', (data) => {
        console.log('sendMessage event received:', data);
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.error('User not found for receiverId:', data.receiverId);
        }
    });

    // Disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
});
