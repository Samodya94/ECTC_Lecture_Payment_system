const express = require('express');
const dotenv =require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { protect } = require('./middleware/authMiddleware');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', protect, require('./routes/userRoutes'));
app.use('/api/branch', protect, require('./routes/branchRoutes'));
app.use('/api/batch', protect, require('./routes/batchRoutes'));
app.use('/api/course', protect, require('./routes/courseRoutes'));
app.use('/api/lecturer', protect, require('./routes/lecturerRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});