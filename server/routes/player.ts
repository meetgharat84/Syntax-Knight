import { Router, Request, Response } from 'express';
import { Player } from '../models/Player';
import { connectToDatabase } from '../../lib/mongodb';

const router = Router();

// Middleware to ensure DB connection
async function ensureDbConnected(_req: Request, res: Response, next: () => void) {
  try {
    await connectToDatabase();
    next();
  } catch (err: any) {
    res.status(500).json({ error: 'Database connection error', details: err?.message });
  }
}

router.use(ensureDbConnected as any);

// GET /api/health - Test DB Connection Status
router.get('/health', async (_req: Request, res: Response) => {
  try {
    const playerCount = await Player.countDocuments();
    res.json({
      status: 'online',
      message: 'SyntaxKnight MongoDB Server is running & connected 🚀⚔️',
      totalPlayersInDb: playerCount,
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error?.message });
  }
});

// GET /api/player/:id - Get player profile by Supabase ID
router.get('/player/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let player = await Player.findOne({ supabaseId: id });
    if (!player) {
      // Return 404 or empty default so client knows to initialize
      return res.status(404).json({ message: 'Player not found in database' });
    }
    return res.json(player);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch player profile', details: error?.message });
  }
});

// PUT /api/player/:id - Upsert player profile data
router.put('/player/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const player = await Player.findOneAndUpdate(
      { supabaseId: id },
      { $set: { ...updateData, supabaseId: id } },
      { new: true, upsert: true, runValidators: true }
    );
    return res.json({ success: true, player });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to save player profile', details: error?.message });
  }
});

// GET /api/leaderboard - Top 20 players by XP
router.get('/leaderboard', async (_req: Request, res: Response) => {
  try {
    const topPlayers = await Player.find({}, 'playerName playerTrack currentXP playerLevel completedMissions unlockedBadges')
      .sort({ currentXP: -1 })
      .limit(20);
    return res.json(topPlayers);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch leaderboard', details: error?.message });
  }
});

export default router;
