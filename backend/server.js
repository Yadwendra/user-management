// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const usersRouter = require('./routes/users');
const path = require('path')

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;


// MongoDB connection
connectDB()

const _dirname = path.resolve();
// Routes
app.use('/api/users', usersRouter);


app.use(express.static(path.join(_dirname,'/frontend/dist')))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend",'dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
