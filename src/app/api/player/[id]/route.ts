import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/app/api/users/route';
import { secureJsonResponse, checkRateLimit } from '@/lib/security';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 100);
    if (!rateCheck.allowed) {
      return secureJsonResponse({ success: false, error: 'Rate limit exceeded' }, 429);
    }

    await connectToDatabase();
    const { id } = await params;
    const cleanId = String(id).trim();
    const sanitizedEmail = `${cleanId.toLowerCase().replace(/[^a-z0-9._-]/g, '')}@player.syntaxknight.local`;

    const user = await User.findOne({
      $or: [
        { supabaseId: cleanId },
        { email: cleanId.toLowerCase() },
        { playerName: new RegExp(`^${cleanId}$`, 'i') },
        { email: sanitizedEmail },
        ...(mongoose.Types.ObjectId.isValid(cleanId) ? [{ _id: cleanId }] : [])
      ],
    });

    if (!user) {
      return secureJsonResponse(
        { success: false, error: 'Player not found' },
        404
      );
    }

    return secureJsonResponse(user);
  } catch (error: any) {
    return secureJsonResponse(
      { success: false, error: 'Server error' },
      500
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 60);
    if (!rateCheck.allowed) {
      return secureJsonResponse({ success: false, error: 'Rate limit exceeded' }, 429);
    }

    await connectToDatabase();
    const { id } = await params;
    const cleanId = String(id).trim();
    const sanitizedEmail = `${cleanId.toLowerCase().replace(/[^a-z0-9._-]/g, '')}@player.syntaxknight.local`;
    const body = await request.json();

    // Sanitize body keys & Whitelist all valid game progress properties
    const safeSetFields: Record<string, any> = {
      lastActive: new Date()
    };
    const allowedKeys = [
      'supabaseId',
      'fullName',
      'playerName',
      'email',
      'dob',
      'age',
      'track',
      'playerTrack',
      'role',
      'restrictedMode',
      'avatarUrl',
      'currentXP',
      'playerLevel',
      'completedMissions',
      'currentStreak',
      'unlockedBadges',
      'claimedAdvancements',
      'unlockedItems',
      'playerTokens',
      'inventory'
    ];

    for (const key of Object.keys(body)) {
      if (allowedKeys.includes(key) && !key.startsWith('$')) {
        safeSetFields[key] = body[key];
      }
    }

    const filterQuery = {
      $or: [
        { supabaseId: cleanId },
        { email: cleanId.toLowerCase() },
        { playerName: new RegExp(`^${cleanId}$`, 'i') },
        { email: sanitizedEmail },
        ...(mongoose.Types.ObjectId.isValid(cleanId) ? [{ _id: cleanId }] : [])
      ]
    };

    // If cleanId is an email address or supabaseId, attach it to safeSetFields
    if (cleanId.includes('@')) {
      if (!safeSetFields.email) safeSetFields.email = cleanId.toLowerCase();
    } else {
      if (!safeSetFields.supabaseId) safeSetFields.supabaseId = cleanId;
      if (!safeSetFields.email) {
        safeSetFields.email = sanitizedEmail;
      }
    }

    if (!safeSetFields.playerName) {
      safeSetFields.playerName = cleanId;
    }

    const user = await User.findOneAndUpdate(
      filterQuery,
      { $set: safeSetFields },
      { upsert: true, new: true, runValidators: true }
    );

    return secureJsonResponse({ success: true, user });
  } catch (error: any) {
    console.error('Error in PUT /api/player/[id]:', error);
    return secureJsonResponse(
      { success: false, error: 'Server error saving player progress' },
      500
    );
  }
}
