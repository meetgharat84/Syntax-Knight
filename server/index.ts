import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import playerRoutes from './routes/player';
import { connectToDatabase } from '../lib/mongodb';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', playerRoutes);

// Root route check
app.get('/', (_req, res) => {
  res.send('⚔️ SyntaxKnight Express MongoDB Backend Server active!');
});

// Start HTTP server immediately
app.listen(PORT, () => {
  console.log(`\n🚀 SyntaxKnight MongoDB API Server active at: http://localhost:${PORT}`);
  console.log(`📊 Health Endpoint: http://localhost:${PORT}/api/health\n`);

  // Connect to MongoDB Atlas in background
  connectToDatabase()
    .then(() => {
      console.log('✅ MongoDB Atlas database connection established successfully.');
    })
    .catch((err) => {
      console.warn('\n⚠️ MongoDB Atlas Connection Notice:');
      console.warn(err?.message || err);
      console.warn('👉 Please ensure your IP address is whitelisted in MongoDB Atlas Security Network Access (0.0.0.0/0 or current IP).\n');
    });
});
