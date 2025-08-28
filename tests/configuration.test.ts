jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
}));

let mockGetInput: jest.Mock;

describe('configuration', () => {
  const clearEnvVars = () => {
    delete process.env.ADVANCED_TOKEN_JWT;
    delete process.env.DUOLINGO_USER_ID;
    delete process.env.COMMIT_EMAIL;
    delete process.env.COMMIT_MSG;
    delete process.env.COMMIT_USERNAME;
    delete process.env.FILE_NAME;
    delete process.env.IS_DEBUG;
    delete process.env.SHOW_ADVANCED_LEAGUE;
    delete process.env.SHOW_ADVANCED_XP_THIS_WEEK;
    delete process.env.SHOW_LANGUAGES;
    delete process.env.SHOW_LANGUAGES_FROM_ENGLISH;
    delete process.env.SHOW_STREAK_TIMEZONE;
  };

  beforeEach(() => {
    jest.resetModules();
    const { getInput } = require('@actions/core');
    mockGetInput = getInput as jest.Mock;
    mockGetInput.mockReset();
    clearEnvVars();
  });

  it('should use default values when no inputs or env vars are provided', () => {
    mockGetInput.mockImplementation((name: string) => {
      return name === 'DUOLINGO_USER_ID' ? 'test-user-id' : '';
    });

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.auth.advancedTokenJwt).toBe('');
    expect(configuration.auth.duolingoUserId).toBe('test-user-id');
    expect(configuration.commit.email).toBe('41898282+github-actions[bot]@users.noreply.github.com');
    expect(configuration.commit.message).toBe('💬 Updated README with your duolingo stats');
    expect(configuration.commit.username).toBe('duolingo-stats-bot');
    expect(configuration.file.name).toBe('README.md');
    expect(configuration.flags.isDebug).toBe(false);
    expect(configuration.flags.showAdvancedLeague).toBe(true);
    expect(configuration.flags.showAdvancedXpThisWeek).toBe(true);
    expect(configuration.flags.showLanguages).toBe(true);
    expect(configuration.flags.showLanguagesFromEnglish).toBe(false);
    expect(configuration.flags.showStreakTimezone).toBe(false);
  });

  it('should throw error when required inputs are not provided', () => {
    mockGetInput.mockReturnValue(''); // Simulate getInput returning empty for all keys

    expect(() => {
      const { getConfiguration } = require('../src/configuration');
      getConfiguration();
    }).toThrow('Input required and not provided: DUOLINGO_USER_ID');
  });

  it('should accept required input from environment variable', () => {
    mockGetInput.mockReturnValue('');
    process.env.DUOLINGO_USER_ID = 'env-user-id';

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.auth.duolingoUserId).toBe('env-user-id');
  });

  it('should use getInput values when provided', () => {
    mockGetInput.mockImplementation((name: string) => {
      const values: { [key: string]: string } = {
        ADVANCED_TOKEN_JWT: 'input-jwt',
        DUOLINGO_USER_ID: 'input-user',
        COMMIT_EMAIL: 'input-email@example.com',
        COMMIT_MSG: 'Input commit message',
        COMMIT_USERNAME: 'input-ci-bot',
        FILE_NAME: 'INPUT.md',
        IS_DEBUG: 'true',
        SHOW_ADVANCED_LEAGUE: 'true',
        SHOW_LANGUAGES: 'false',
      };
      return values[name] || '';
    });

    // Set an environment variable to ensure getInput takes precedence
    process.env.ADVANCED_TOKEN_JWT = 'env-jwt-should-not-be-overridden';
    process.env.DUOLINGO_USER_ID = 'env-user-should-not-be-overridden';

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.auth.advancedTokenJwt).toBe('input-jwt');
    expect(configuration.auth.duolingoUserId).toBe('input-user');
    expect(configuration.commit.email).toBe('input-email@example.com');
    expect(configuration.commit.message).toBe('Input commit message');
    expect(configuration.commit.username).toBe('input-ci-bot');
    expect(configuration.file.name).toBe('INPUT.md');
    expect(configuration.flags.isDebug).toBe(true);
    expect(configuration.flags.showAdvancedLeague).toBe(true);
    expect(configuration.flags.showLanguages).toBe(false);
  });

  it('should use environment variable values when getInput is empty', () => {
    mockGetInput.mockReturnValue(''); // Simulate getInput returning empty for all keys

    process.env.ADVANCED_TOKEN_JWT = 'env-jwt';
    process.env.DUOLINGO_USER_ID = 'env-user';
    process.env.COMMIT_EMAIL = 'env-email@example.com';
    process.env.COMMIT_MSG = 'Env commit message';
    process.env.COMMIT_USERNAME = 'env-ci-bot';
    process.env.FILE_NAME = 'ENV.md';
    process.env.IS_DEBUG = 'true';
    process.env.SHOW_ADVANCED_LEAGUE = 'True'; // Test case-insensitivity for booleans
    process.env.SHOW_LANGUAGES = 'FALSE';     // Test case-insensitivity for booleans

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.auth.advancedTokenJwt).toBe('env-jwt');
    expect(configuration.auth.duolingoUserId).toBe('env-user');
    expect(configuration.commit.email).toBe('env-email@example.com');
    expect(configuration.commit.message).toBe('Env commit message');
    expect(configuration.commit.username).toBe('env-ci-bot');
    expect(configuration.file.name).toBe('ENV.md');
    expect(configuration.flags.isDebug).toBe(true);
    expect(configuration.flags.showAdvancedLeague).toBe(true);
    expect(configuration.flags.showLanguages).toBe(false);
  });

  it('should correctly parse boolean inputs regardless of case', () => {
    // Set required input first
    process.env.DUOLINGO_USER_ID = 'required-user-id';
    
    mockGetInput.mockImplementation((name: string) => {
      const values: { [key: string]: string } = {
        IS_DEBUG: 'True',
        SHOW_ADVANCED_LEAGUE: 'FALSE',
        SHOW_LANGUAGES: 'true',
        SHOW_LANGUAGES_FROM_ENGLISH: 'false',
      };
      return values[name] || '';
    });

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.flags.isDebug).toBe(true);
    expect(configuration.flags.showAdvancedLeague).toBe(false);
    expect(configuration.flags.showLanguages).toBe(true);
    expect(configuration.flags.showLanguagesFromEnglish).toBe(false);
  });

  it('should use default for boolean if input/env is present but not "true"', () => {
    // Set required input first
    process.env.DUOLINGO_USER_ID = 'required-user-id';
    
    mockGetInput.mockImplementation((name: string) => (name === 'IS_DEBUG' ? 'yes' : ''));
    process.env.SHOW_ADVANCED_LEAGUE = 'maybe';

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    // 'yes' is not 'true', so it should be false (default)
    expect(configuration.flags.isDebug).toBe(false);
    // 'maybe' is not 'true', so it should be false (default)
    expect(configuration.flags.showAdvancedLeague).toBe(false);
    // SHOW_LANGUAGES is not set by input or env, should be its default (true)
    expect(configuration.flags.showLanguages).toBe(true);
  });

  it('should prioritize getInput over environment variables', () => {
    mockGetInput.mockImplementation((name: string) => {
      if (name === 'DUOLINGO_USER_ID') return 'input-user-id';
      if (name === 'COMMIT_EMAIL') return 'input-email@example.com';
      if (name === 'IS_DEBUG') return 'true';
      return '';
    });

    process.env.DUOLINGO_USER_ID = 'env-user-id'; // This should be overridden
    process.env.COMMIT_EMAIL = 'env-email@example.com'; // This should be overridden
    process.env.IS_DEBUG = 'false'; // This should be overridden
    process.env.FILE_NAME = 'env-file.md'; // This should be used as getInput for it is empty

    const { getConfiguration } = require('../src/configuration');
    const configuration = getConfiguration();

    expect(configuration.auth.duolingoUserId).toBe('input-user-id');
    expect(configuration.commit.email).toBe('input-email@example.com');
    expect(configuration.flags.isDebug).toBe(true);
    expect(configuration.file.name).toBe('env-file.md');
  });
});
