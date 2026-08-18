import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlayer extends Document {
  supabaseId: string;
  playerName: string;
  playerTrack: string;
  currentXP: number;
  playerLevel: number;
  completedMissions: string[];
  currentStreak: number;
  unlockedBadges: string[];
  playerTokens: number;
  claimedAdvancements: string[];
  unlockedItems: string[];
  activeTheme: string;
  updatedAt: Date;
  createdAt: Date;
}

const PlayerSchema: Schema<IPlayer> = new Schema(
  {
    supabaseId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    playerName: {
      type: String,
      default: 'Knight Initiate',
    },
    playerTrack: {
      type: String,
      default: 'Frontend',
    },
    currentXP: {
      type: Number,
      default: 0,
    },
    playerLevel: {
      type: Number,
      default: 1,
    },
    completedMissions: {
      type: [String],
      default: [],
    },
    currentStreak: {
      type: Number,
      default: 1,
    },
    unlockedBadges: {
      type: [String],
      default: [],
    },
    playerTokens: {
      type: Number,
      default: 10,
    },
    claimedAdvancements: {
      type: [String],
      default: [],
    },
    unlockedItems: {
      type: [String],
      default: [],
    },
    activeTheme: {
      type: String,
      default: 'light',
    },
  },
  {
    timestamps: true,
  }
);

export const Player: Model<IPlayer> =
  mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);

export default Player;
