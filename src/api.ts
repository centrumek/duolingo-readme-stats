import fetch from './fetch';
import {UserDetailsResponse} from "./types";

export const getUserDetails = async (userId: string, jwt?: string): Promise<UserDetailsResponse> => {
    return await fetch<UserDetailsResponse>(
        `/2017-06-30/users/` + userId + `?fields=id,username,creationDate,streak,inviteURL,totalXp,courses,trackingProperties,xpGains,streakData`,
        jwt
    );
};