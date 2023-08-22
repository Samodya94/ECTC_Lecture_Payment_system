const express = require('express');
const dotenv =require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/branch', require('./routes/branchRoutes'));
app.use('/api/batch', require('./routes/batchRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});