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

export type UserDetailsResponse = {
    id: number;
    username: string;
    creationDate: number;
    streak: number;
    totalXp: number;
    inviteURL: string;
    courses: Course[];
    trackingProperties: TrackingProperties;
};