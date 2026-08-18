import { worldSyllabus, SyllabusLevel, SyllabusWorld } from '../syllabusData';

export interface ChallengeItem extends SyllabusLevel {
  worldId: string;
  worldName: string;
}

/**
 * Returns a flat list of all challenges across all worlds in SyntaxKnight.
 */
export function getAllChallenges(): ChallengeItem[] {
  const challenges: ChallengeItem[] = [];

  worldSyllabus.forEach((world: SyllabusWorld) => {
    world.levels.forEach((level: SyllabusLevel) => {
      challenges.push({
        ...level,
        worldId: world.worldId,
        worldName: world.worldName,
      });
    });
  });

  return challenges;
}

/**
 * Retrieves a single challenge by its unique ID.
 */
export function getChallengeById(id: string): ChallengeItem | undefined {
  if (!id) return undefined;
  const all = getAllChallenges();
  return all.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

/**
 * Retrieves the next challenge after the given challenge ID.
 */
export function getNextChallenge(currentId: string): ChallengeItem | undefined {
  const all = getAllChallenges();
  const index = all.findIndex((c) => c.id.toLowerCase() === currentId.toLowerCase());
  if (index >= 0 && index < all.length - 1) {
    return all[index + 1];
  }
  return undefined;
}

/**
 * Retrieves the previous challenge before the given challenge ID.
 */
export function getPrevChallenge(currentId: string): ChallengeItem | undefined {
  const all = getAllChallenges();
  const index = all.findIndex((c) => c.id.toLowerCase() === currentId.toLowerCase());
  if (index > 0) {
    return all[index - 1];
  }
  return undefined;
}
