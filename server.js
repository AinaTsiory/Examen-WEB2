const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');



app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API started on ${PORT}`));
