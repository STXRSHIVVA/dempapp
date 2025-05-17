import express from 'express';
import pool from '../db.js';
import { hashPassword } from '@voilajsx/appkit/auth';

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashed = await hashPassword(password);

    const [result] = await pool.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashed]
    );

    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
});

export default router;
