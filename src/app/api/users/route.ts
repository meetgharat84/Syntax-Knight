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
    console.error('❌ [USERS_GET_ERROR] Error fetching users from MongoDB:', error?.message || error, error?.stack);
    return secureJsonResponse(
      { success: false, error: 'Failed to fetch users', details: error?.message },
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
      avatarUrl,
      currentXP,
      playerLevel,
      completedMissions,
      currentStreak,
      unlockedBadges,
      claimedAdvancements,
      unlockedItems,
      playerTokens,
      inventory,
    } = body;

    // Validate email
    const emailStr = String(email || '').trim();
    if (!emailStr || !emailStr.includes('@')) {
      return secureJsonResponse(
        { success: false, error: 'A valid email address is required.' },
        400
      );
    }

    const emailLower = emailStr.toLowerCase();

    // Check age verification
    let isUnder18 = false;
    if (dob) {
      const birthDate = new Date(dob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        if (calculatedAge < 18) {
          isUnder18 = true;
        }
      }
    } else if (age !== undefined && typeof age === 'number' && age < 18) {
      isUnder18 = true;
    }

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
    if (fullName) updateFields.fullName = String(fullName).trim();
    
    // Sanitize playerName - ignore UUIDs
    if (playerName && typeof playerName === 'string' && !isIdString(playerName)) {
      updateFields.playerName = playerName.trim();
    } else if (fullName && typeof fullName === 'string' && !isIdString(fullName)) {
      updateFields.playerName = fullName.trim();
    } else if (!emailLower.includes('@player.syntaxknight.local')) {
      updateFields.playerName = emailLower.split('@')[0].toUpperCase();
    }

    if (dob) updateFields.dob = String(dob);
    if (age !== undefined && typeof age === 'number') updateFields.age = age;
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
    console.error('❌ [USERS_POST_ERROR] Error saving user to MongoDB:', error?.message || error, error?.stack);
    return secureJsonResponse(
      {
        success: false,
        error: 'Failed to save user to database',
        details: error?.message,
      },
      500
    );
  }
}
