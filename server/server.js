const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { protectUser,lecturerUser } = require('./middleware/authMiddleware');
const cors = require('cors');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//Admin Dashborad routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/branch', require('./routes/branchRoutes'));
app.use('/api/batch', require('./routes/batchRoutes'));
app.use('/api/course', require('./routes/courseRoutes'));
app.use('/api/lecturer', require('./routes/lecturerRoutes'));
app.use('/api/coverage',  require('./routes/approveLectureCoverageRoutes'));
app.use('/api/assignbatch', require('./routes/AssignBatchesRoutes'));

//Lecturer Routes
app.use('/api/Lecturer/course',lecturerUser, require('./routes/courseRoutes'));
app.use('/api/lecturer',lecturerUser, require('./routes/lecturerRoutes'));
app.use('/api/coverage',lecturerUser,  require('./routes/approveLectureCoverageRoutes'));
app.use('/api/assignbatch',lecturerUser, require('./routes/AssignBatchesRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});