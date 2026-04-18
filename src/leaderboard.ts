// Sistem Peringkat - Coming Soon
// Placeholder untuk implementasi sistem peringkat berdasarkan poin dan level pengguna

import { ref, query, orderByChild, limitToFirst, get } from 'firebase/database';
import { db } from './firebase';

export interface LeaderboardEntry {
  uid: string;
  name: string;
  class: string;
  points: number;
  level: number;
  completedActivities: string[];
  badges: string[];
}

export const getLeaderboard = async (limitCount: number = 10): Promise<LeaderboardEntry[]> => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      return [];
    }

    const usersData = snapshot.val();
    const leaderboard: LeaderboardEntry[] = [];
    
    // Convert to array and sort by points descending
    Object.values(usersData).forEach((user: any) => {
      if (user && typeof user === 'object') {
        leaderboard.push(user as LeaderboardEntry);
      }
    });

    leaderboard.sort((a, b) => b.points - a.points);
    
    return leaderboard.slice(0, limitCount);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};

export const getUserRank = async (userId: string): Promise<number | null> => {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    const usersData = snapshot.val();
    const leaderboard: LeaderboardEntry[] = [];
    
    // Convert to array and sort by points descending
    Object.values(usersData).forEach((user: any) => {
      if (user && typeof user === 'object') {
        leaderboard.push(user as LeaderboardEntry);
      }
    });

    leaderboard.sort((a, b) => b.points - a.points);
    
    // Find user rank
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].uid === userId) {
        return i + 1; // Rank is 1-indexed
      }
    }
    
    return null; // User not found
  } catch (error) {
    console.error('Error getting user rank:', error);
    return null;
  }
};

// TODO: Implement ranking badges based on achievements
// TODO: Add seasonal rankings
// TODO: Add class-based rankings