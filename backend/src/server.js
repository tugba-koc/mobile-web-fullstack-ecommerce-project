import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

app.use(clerkMiddleware()); // adds auth object under req.auth

const __dirname = path.resolve();

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

// make our app ready for deployment
if (ENV.NODE_ENV === 'production') {
  const adminDistPath = path.join(__dirname, '../admin/dist');

  app.use(express.static(adminDistPath));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(adminDistPath, 'index.html'));
  });
}

// FOR PROTECTED ROUTES
// app.get('/protected', requireAuth(), async (req, res) => {
// Use `getAuth()` to get the user's `userId`
// const { userId } = getAuth(req)

// Use Clerk's JS Backend SDK to get the user's User object
//   const user = await clerkClient.users.getUser(userId)

//   return res.json({ user })
// })

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log('Server is running on port ' + ENV.PORT);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit with failure code
  }
};

startServer();