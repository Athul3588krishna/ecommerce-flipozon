require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRouter = require('./router/auth');
const rideRouter = require('./router/ride');
const driverRouter = require('./router/driver');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

app.use(cors());
app.use(express.json());
global.io = io;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join', (userId) => socket.join(userId));
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

app.use('/api/auth', authRouter);
app.use('/api/ride', rideRouter);
app.use('/api/driver', driverRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));