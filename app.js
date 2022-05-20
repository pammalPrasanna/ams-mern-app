var express = require('express');
require('dotenv').config();
const cors = require('cors');
const colors = require('colors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { errorHandler } = require('./src/middlewares/errorMiddleware');
const connectDB = require('./src/configs/db');

const usersRouter = require('./src/routes/users.routes');
const orgsRouter = require('./src/routes/organizations.routes');
const membersRouter = require('./src/routes/member.routes');
const attendanceRouter = require('./src/routes/attendance.routes');


connectDB();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/users', usersRouter);
app.use('/api/orgs', orgsRouter);
app.use('/api/members', membersRouter);
app.use('/api/attendance/', attendanceRouter);

// serve frontend

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './', 'frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Not in Production'))
}

app.use(errorHandler);

module.exports = app;
