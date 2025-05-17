import express from 'express';
import dotenv from 'dotenv';

import signupRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import profileRouter from './routes/profile.js';
import dashboardRouter from './routes/dashboard.js';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to your dashboard!' });
});

app.use('/api/auth/signup', signupRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/profile', profileRouter);
app.use('/api/dashboard', dashboardRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
