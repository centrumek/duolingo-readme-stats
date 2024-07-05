export type XPGain = {
    skillId: string|null,
    xp: number,
    eventType: string|null,
    time: number
}

export type TrackingProperties = {
    num_followers: number;
    num_following: number;
    leaderboard_league: number;
}

export type Course = {
    title: string;
    fromLanguage: string;
    xp: number;
    crowns: number;
}

export type StreakInfo = {
    endDate: string;
    length: number;
    lastExtendedDate: string;
    startDate: string;
}

export type UserDetailsResponse = {
    id: number;
    username: string;
    creationDate: number;
    streak: number;
    totalXp: number;
    inviteURL: string;
    courses: Course[];
    trackingProperties: TrackingProperties;
    xpGains: XPGain[];
    streakData: {
        currentStreak: StreakInfo;
        previousStreak: StreakInfo;
        length: number;
        xpGoal: number;
        longestStreak: StreakInfo;
        updatedTimeZone: string;
    }
};