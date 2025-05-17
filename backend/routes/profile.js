import express from 'express';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}!`,
    user: req.user,
  });
});

export default router;
