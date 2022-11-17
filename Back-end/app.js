import dotenv from 'dotenv/config.js';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/auth.js';
import './database.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        // allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);
app.use("/auth", authRouter);

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    // notify existing users
    socket.broadcast.emit("user connected", {
        userID: socket.id,
        username: socket.username,
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // forward the private message to the right recipient
    socket.on("private message", ({ content, to }) => {
        socket.to(to).emit("private message", {
            content,
            from: socket.id,
        });
    });

    // notify users upon disconnection
    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
    });
});


// servidor e porta
const port = process.env.PORT || 3001;
httpServer.listen(port, () =>
    console.log('O servidor está rodando no endereço http://localhost:' + port)
);
