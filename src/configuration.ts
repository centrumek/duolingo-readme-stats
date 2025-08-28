import { getInput } from '@actions/core';

function defaultInput(name: string, defaultValue: string): string {
  return getInput(name) || process.env[name] || defaultValue;
}

function requiredInput(name: string): string {
  const value = getInput(name) || process.env[name];
  if (!value) {
    throw new Error(`Input required and not provided: ${name}`);
  }
  return value;
}

function defaultBooleanInput(name: string, defaultValue = false): boolean {
  const val = getInput(name) || process.env[name];
  if (val === undefined || val === '') return defaultValue;
  return val.toLowerCase() === 'true';
}

export const getConfiguration = () => ({
  auth: {
    advancedTokenJwt: defaultInput('ADVANCED_TOKEN_JWT', ''),
    duolingoUserId: requiredInput('DUOLINGO_USER_ID'),
  },
  commit: {
    email: defaultInput('COMMIT_EMAIL', '41898282+github-actions[bot]@users.noreply.github.com'),
    message: defaultInput('COMMIT_MSG', '💬 Updated README with your duolingo stats'),
    username: defaultInput('COMMIT_USERNAME', 'duolingo-stats-bot'),
  },
  file: {
    name: defaultInput('FILE_NAME', 'README.md'),
  },
  flags: {
    isDebug: defaultBooleanInput('IS_DEBUG', false),
    showAdvancedLeague: defaultBooleanInput('SHOW_ADVANCED_LEAGUE', true),
    showAdvancedXpThisWeek: defaultBooleanInput('SHOW_ADVANCED_XP_THIS_WEEK', true),
    showLanguages: defaultBooleanInput('SHOW_LANGUAGES', true),
    showLanguagesFromEnglish: defaultBooleanInput('SHOW_LANGUAGES_FROM_ENGLISH', false),
    showStreakTimezone: defaultBooleanInput('SHOW_STREAK_TIMEZONE', false),
  }
});
