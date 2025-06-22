import express from 'express';
import dotenv from 'dotenv/config';
import mongoose from "mongoose";
import users from './routes/users.js';
import tasks from './routes/tasks.js';
import projects from './routes/projects.js';

const app = express();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;

try {
    await mongoose.connect(URI);
} catch (err) {
    console.error(err.message);
}

app.use(express.json());

app.use('/users', users);
app.use('/tasks', tasks);
app.use('/projects', projects);

app.use((err, req, res, next) => {
    const status = err.status || 500; 
    const message = err.message || 'Internal server error';
    res.status(status).json(message);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
