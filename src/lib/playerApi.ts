export interface PlayerData {
  supabaseId: string;
  fullName?: string;
  playerName: string;
  email?: string;
  playerTrack: string;
  currentXP: number;
  playerLevel: number;
  completedMissions: string[];
  currentStreak: number;
  unlockedBadges: string[];
  playerTokens: number;
  claimedAdvancements?: string[];
  unlockedItems?: string[];
  activeTheme?: string;
}

export async function getPlayerFromMongo(supabaseId: string): Promise<PlayerData | null> {
  try {
    const res = await fetch(`/api/player/${supabaseId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn('Could not fetch player profile:', error);
    return null;
  }
}

export async function savePlayerToMongo(supabaseId: string, data: Partial<PlayerData>): Promise<boolean> {
  try {
    const res = await fetch(`/api/player/${supabaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.warn('Could not save player profile:', error);
    return false;
  }
}
