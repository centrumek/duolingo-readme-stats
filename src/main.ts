import { getUserDetails } from './api';
import { StreakData, UserDetailsResponse } from './types';
import { getConfiguration } from './configuration';
import { commitFile, setFailure, updateFile } from './utils';
import { formatLanguagesTable, formatOverviewTable } from './tableUtils';

(async () => {
  try {
    const configuration = getConfiguration();
    const fileName = configuration.file.name;
    const fileContent = await buildContent();
    updateFile(fileName, fileContent);
    if (!configuration.flags.isDebug) {
      const commitMsg = configuration.commit.message;
      const commitUsername = configuration.commit.username;
      const commitEmail = configuration.commit.email;
      await commitFile(fileName, commitMsg, commitUsername, commitEmail);
    }
    console.log(`Successfully updated the '${fileName}' file!`);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'The action failed with an Unknown error';
    setFailure(errorMessage);
  }
})();

async function buildContent(
  configuration: ReturnType<typeof getConfiguration> = getConfiguration()
): Promise<string[]> {
  const content: string[] = [];

  const userDetails: UserDetailsResponse = await getUserDetails(
    configuration.auth.duolingoUserId,
    configuration.auth.advancedTokenJwt
  );

  let streakStatus = calculateStreakStatus(userDetails.streakData);
  let xpThisWeek =
    configuration.flags.showAdvancedXpThisWeek &&
    userDetails.xpGains != undefined
      ? userDetails.xpGains
      : [];
  let leagueId =
    configuration.flags.showAdvancedLeague &&
    userDetails.trackingProperties &&
    userDetails.trackingProperties.leaderboard_league != undefined
      ? userDetails.trackingProperties.leaderboard_league
      : null;
  let streakTimeZone =
    configuration.flags.showStreakTimezone &&
    userDetails.streakData &&
    userDetails.streakData.updatedTimeZone != undefined
      ? userDetails.streakData.updatedTimeZone
      : null;

  content.push(
    formatOverviewTable(
      userDetails.username,
      userDetails.streak,
      streakStatus,
      userDetails.totalXp,
      xpThisWeek,
      leagueId,
      streakTimeZone
    )
  );

  if (configuration.flags.showLanguages) {
    if (userDetails.courses.length === 0) {
      throw new Error('No languages found!');
    }
    content.push(formatLanguagesTable(userDetails.courses));
  }

  return content;
}

function calculateStreakStatus(streakData: StreakData) {
  const timezone = streakData.updatedTimeZone;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  const formatter = new Intl.DateTimeFormat('en-UK', options);
  const parts = formatter.formatToParts(now);

  const formattedToday = `${parts.find(p => p.type === 'year')!.value}-${
    parts.find(p => p.type === 'month')!.value
  }-${parts.find(p => p.type === 'day')!.value}`;

  // Parse the last extended date and the current date in the specified timezone
  const lastExtendedDate = new Date(streakData.currentStreak.lastExtendedDate);
  const currentDateInTimeZone = new Date(
    now.toLocaleString('en-US', { timeZone: timezone })
  );

  // Calculate the difference in time
  const timeDifference =
    currentDateInTimeZone.getTime() - lastExtendedDate.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Determine the streak status
  let streakStatus: boolean | null = null;
  if (daysDifference <= 2) {
    streakStatus = streakData.currentStreak.lastExtendedDate === formattedToday;
  } else {
    streakStatus = null; // Streak is frozen
  }

  return streakStatus;
}
