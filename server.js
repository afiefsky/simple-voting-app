const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let votes = {
    option1: 0,
    option2: 0,
    option3: 0
};

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('updateVotes', votes);

    socket.on('vote', (option) => {
        if (votes.hasOwnProperty(option)) {
            votes[option]++;
            io.emit('updateVotes', votes);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
