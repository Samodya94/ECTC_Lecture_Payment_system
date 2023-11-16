const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { protectUser } = require('./middleware/authMiddleware');
const cors = require('cors');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/branch', protectUser, require('./routes/branchRoutes'));
app.use('/api/batch', protectUser, require('./routes/batchRoutes'));
app.use('/api/course', protectUser, require('./routes/courseRoutes'));
app.use('/api/lecturer', protectUser, require('./routes/lecturerRoutes'));
app.use('/api/coverage', protectUser, require('./routes/approveLectureCoverageRoutes'));
app.use('/api/assignbatch', protectUser, require('./routes/AssignBatchesRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});