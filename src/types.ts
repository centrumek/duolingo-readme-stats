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

export type CurrentStreak = {
    endDate: string;
    length: number;
    lastExtendedDate: string;
    startDate: string;
}

export type PreviousStreak = {
    endDate: string;
    length: number;
    lastExtendedDate: string;
    startDate: string;
}

export type LongestStreak = {
    endDate: string;
    length: number;
    achieveDate: string;
    startDate: string;
}

export type StreakData = {
    currentStreak: CurrentStreak;
    previousStreak: PreviousStreak;
    length: number;
    xpGoal: number;
    longestStreak: LongestStreak;
    updatedTimeZone: string;
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
    streakData: StreakData;
};