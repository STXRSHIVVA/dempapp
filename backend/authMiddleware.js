import { createAuthMiddleware } from '@voilajsx/appkit/auth';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = createAuthMiddleware({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

export default authMiddleware;
