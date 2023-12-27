const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { protectUser, lecturerUser } = require('./middleware/authMiddleware');
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
app.use('/api/coverage', require('./routes/approveLectureCoverageRoutes'));
app.use('/api/assignbatch', require('./routes/AssignBatchesRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/lecLog', require('./routes/leclogRoutes'));
app.use('/api/loginDetails', require('./routes/loginDetailsRoutes'));

//Lecturer Routes
app.use('/api/LecturerRoute/coverage', lecturerUser, require('./routes/lecturerRoutes/approveLectureCoverageRoutes'));
app.use('/api/LecturerRoute/lecturer', lecturerUser, require('./routes/lecturerRoutes/lecturerRoutes'));
app.use('/api/LecturerRoute/assignbatch', lecturerUser, require('./routes/lecturerRoutes/AssignBatchesRoutes'));
app.use('/api/LecturerRoute/batch',lecturerUser, require('./routes/lecturerRoutes/batchRoutes'));
app.use('/api/LectRoute/login',require('./routes/lecturerRoutes/lectLoginRoute'));
app.use('/api/LecturerRoute/lecLog',require('./routes/lecturerRoutes/lecturerlogRoutes'));
app.use('/api/LecturerRoute/payment',lecturerUser,require('./routes/lecturerRoutes/paymentRoutes'));

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});