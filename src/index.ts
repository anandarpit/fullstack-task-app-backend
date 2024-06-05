import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import { createServer } from 'http';
import { Server } from 'socket.io';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || '';

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

mongoose.connect(MONGO_URI)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

io.on('connection', (socket) => {
  console.log('a user connected');
});

export { io };
