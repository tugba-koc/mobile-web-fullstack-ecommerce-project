import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
}
