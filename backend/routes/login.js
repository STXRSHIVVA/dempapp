import express from 'express';
import pool from '../db.js';
import { comparePassword } from '@voilajsx/appkit/auth';
import { generateToken } from '@voilajsx/appkit/auth';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const isValid = await comparePassword(password, user.password);

    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(
      { id: user.id, username: user.username, roles: JSON.parse(user.roles || '["user"]') },
      { secret: process.env.JWT_SECRET }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
