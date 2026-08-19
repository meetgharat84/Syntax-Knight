import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import mongoose, { Schema, Document, Model } from 'mongoose';
import { secureJsonResponse, checkRateLimit } from '@/lib/security';

export interface IInventory {
  hintsAvailable?: number;
  skipTickets?: number;
  streakFreezeActive?: boolean;
  streakFreezes?: number;
  aiCredits?: number;
  doubleXpCount?: number;
  cyberShields?: number;
  unlockedItems?: string[];
}

/**
 * Interface definition for User Documents in MongoDB
 */
export interface IUser extends Document {
  supabaseId?: string;
  fullName?: string;
  playerName?: string;
  email: string;
  dob?: string;
  age?: number;
  track?: string;
  playerTrack?: string;
  role?: string;
  restrictedMode?: boolean;
  avatarUrl?: string;
  currentXP?: number;
  playerLevel?: number;
  completedMissions?: string[];
  currentStreak?: number;
  unlockedBadges?: string[];
  claimedAdvancements?: string[];
  unlockedItems?: string[];
  playerTokens?: number;
  inventory?: IInventory;
  lastActive?: Date;
}

const InventorySchema = new Schema<IInventory>({
  hintsAvailable: { type: Number, default: 5 },
  skipTickets: { type: Number, default: 0 },
  streakFreezeActive: { type: Boolean, default: false },
  streakFreezes: { type: Number, default: 0 },
  aiCredits: { type: Number, default: 20 },
  doubleXpCount: { type: Number, default: 0 },
  cyberShields: { type: Number, default: 0 },
  unlockedItems: { type: [String], default: [] }
}, { _id: false });

/**
 * Mongoose Schema definition for the `users` collection.
 */
const UserSchema = new Schema<IUser>(
  {
    supabaseId: { type: String, index: true },
    fullName: { type: String },
    playerName: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    dob: { type: String },
    age: { type: Number },
    track: { type: String, default: 'Frontend' },
    playerTrack: { type: String, default: 'Frontend' },
    role: { type: String, default: 'Cadet' },
    restrictedMode: { type: Boolean, default: false },
    avatarUrl: { type: String, default: '' },
    currentXP: { type: Number, default: 0 },
    playerLevel: { type: Number, default: 1 },
    completedMissions: { type: [String], default: [] },
    currentStreak: { type: Number, default: 0 },
    unlockedBadges: { type: [String], default: [] },
    claimedAdvancements: { type: [String], default: [] },
    unlockedItems: { type: [String], default: [] },
    playerTokens: { type: Number, default: 10 },
    inventory: { type: InventorySchema, default: () => ({}) },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

/**
 * GET /api/users
 */
export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 100);
    if (!rateCheck.allowed) {
      return secureJsonResponse({ success: false, error: 'Rate limit exceeded. Please try again later.' }, 429);
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const emailParam = searchParams.get('email');
    const idParam = searchParams.get('id');

    if (emailParam || idParam) {
      const target = String(emailParam || idParam).trim().toLowerCase();
      const user = await User.findOne({
        $or: [
          { email: target },
          { supabaseId: target },
          ...(mongoose.Types.ObjectId.isValid(target) ? [{ _id: target }] : [])
        ]
      });
      return secureJsonResponse({ success: true, user: user || null });
    }

    const users = await User.find().sort({ createdAt: -1 }).limit(50);
    return secureJsonResponse({ success: true, count: users.length, users });
  } catch (error: any) {
    console.error('Error fetching users from MongoDB:', error);
    return secureJsonResponse(
      { success: false, error: 'Failed to fetch users' },
      500
    );
  }
}

/**
 * POST /api/users
 */
export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 60);
    if (!rateCheck.allowed) {
      return secureJsonResponse({ success: false, error: 'Rate limit exceeded.' }, 429);
    }

    await connectToDatabase();
    const body = await request.json();

    const {
      supabaseId,
      fullName,
      playerName,
      email,
      dob,
      age,
      track,
      playerTrack,
      role,
      restrictedMode,
      avatarUrl,
      currentXP,
      playerLevel,
      completedMissions,
      currentStreak,
      unlockedBadges,
      claimedAdvancements,
      unlockedItems,
      playerTokens,
      inventory
    } = body;

    if (!email || typeof email !== 'string' || !email.trim()) {
      return secureJsonResponse(
        { success: false, error: 'Valid email field is required' },
        400
      );
    }

    const emailLower = String(email).trim().toLowerCase();

    // Age calculation & Under-18 restriction flag assignment
    let calculatedAge = typeof age === 'number' ? age : Number(age) || 0;
    if (dob && !calculatedAge) {
      const birthDate = new Date(String(dob));
      const today = new Date();
      calculatedAge = today.getFullYear() - birthDate.getFullYear();
    }
    const isUnder18 = calculatedAge > 0 ? calculatedAge < 18 : Boolean(restrictedMode);

    const updateFields: Record<string, any> = {
      email: emailLower,
      lastActive: new Date(),
    };

    const isIdString = (val?: string): boolean => {
      if (!val) return false;
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const objectIdPattern = /^[0-9a-f]{24}$/i;
      return uuidPattern.test(val.trim()) || objectIdPattern.test(val.trim());
    };

    if (supabaseId) updateFields.supabaseId = String(supabaseId).trim();
    if (fullName && !isIdString(fullName)) updateFields.fullName = String(fullName).trim();
    if (playerName && !isIdString(playerName)) updateFields.playerName = String(playerName).trim();
    else if (fullName && !isIdString(fullName)) updateFields.playerName = String(fullName).trim();
    if (dob !== undefined) updateFields.dob = String(dob);
    if (calculatedAge > 0) updateFields.age = calculatedAge;
    if (track) updateFields.track = String(track);
    if (playerTrack) updateFields.playerTrack = String(playerTrack);
    if (role) updateFields.role = String(role);
    updateFields.restrictedMode = isUnder18;
    if (avatarUrl !== undefined) updateFields.avatarUrl = String(avatarUrl);
    if (typeof currentXP === 'number') updateFields.currentXP = currentXP;
    if (typeof playerLevel === 'number') updateFields.playerLevel = playerLevel;
    if (Array.isArray(completedMissions)) updateFields.completedMissions = completedMissions;
    if (typeof currentStreak === 'number') updateFields.currentStreak = currentStreak;
    if (Array.isArray(unlockedBadges)) updateFields.unlockedBadges = unlockedBadges;
    if (Array.isArray(claimedAdvancements)) updateFields.claimedAdvancements = claimedAdvancements;
    if (Array.isArray(unlockedItems)) updateFields.unlockedItems = unlockedItems;
    if (typeof playerTokens === 'number') updateFields.playerTokens = playerTokens;
    if (inventory && typeof inventory === 'object') updateFields.inventory = inventory;

    const user = await User.findOneAndUpdate(
      { $or: [{ email: emailLower }, ...(supabaseId ? [{ supabaseId: String(supabaseId).trim() }] : [])] },
      { $set: updateFields },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    return secureJsonResponse({
      success: true,
      message: 'User document successfully saved in MongoDB database',
      user,
    });
  } catch (error: any) {
    console.error('Error saving user to MongoDB:', error);
    return secureJsonResponse(
      {
        success: false,
        error: 'Failed to save user to database',
      },
      500
    );
  }
}
