# <img src="./assets/duolingo.png" alt="lplp" width="20" height="20"> Duolingo README Stats <img src="./assets/duolingo.png" alt="lplp" width="20" height="20">

Automatically add and keep up to date your latest stats from [duolingo.com](https://www.duolingo.com/).
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/RichardKanshen/duolingo-readme-stats/duolingo-test-noauth.yml?style=flat-square&label=Duolingo%20Stats%20-%20Unauthenticated)](https://github.com/RichardKanshen/duolingo-readme-stats/blob/main/README-DEMO-NOAUTH.md) [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/RichardKanshen/duolingo-readme-stats/duolingo-test-auth.yml?style=flat-square&label=Duolingo%20Stats%20-%20Authenticated)](https://github.com/RichardKanshen/duolingo-readme-stats/blob/main/README-DEMO-AUTH.md)

| Username | Day Streak | Total XP |
|:---:|:---:|:---:|
| <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/duolingo.png" height="12"> Centrumek | <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/streakinactive.svg" height="12"> 498 | <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> 28588 |

| Language | XP |
|:---:|:---:|
| <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/langs/ukrainian.svg" height="12"> Ukrainian | <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> 12488 |
| <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/langs/spanish.svg" height="12"> Spanish | <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> 10746 |
| <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/langs/japanese.svg" height="12"> Japanese | <img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> 5354 |

## Usage

Add these two placeholders somewhere in your `README.md`, they will get replaced by the action.

```html
<!--START_SECTION:duolingoStats-->

<!--END_SECTION:duolingoStats-->
```

Create a GitHub Action in your repository, you can call it `duolingo-readme-stats.yml`.

```yaml
name: Duolingo README Stats Action

on:
  schedule:
    - cron: '0 0 * * *' # Runs at 00:00 UTC every day
    - cron: '0 22 * * *' # Runs at 00:00 CET every day - updates streak, change 22 to your timezone's midnight in UTC
  workflow_dispatch:

jobs:
  update-readme:
    name: Update readme with your duolingo stats
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v3
      - uses: centrumek/duolingo-readme-stats@main
        with:
          DUOLINGO_USER_ID: <Your duolingo.com user ID>
          SHOW_FROM_ENGLISH: <true/false>
```

`DUOLINGO_USER_ID` variable can be found in browser DevTools [Fn + F12]

- `Application` > `Local Storage` > `https://www.duolingo.com/` >
  e.g. `duo.appLogo` > `{"730772122":{"canShowLogoDot":true}}`.
- `Network` > `Fetch/XHR` > e.g. `https://zombie.duolingo.com/22/web.json?user=730772122`.

`SHOW_FROM_ENGLISH` determines, whether "(from English)" should be appended to languages learnt from English, similarly to learning from other languages.

## Configuration

There are a few configuration options you can use in your GitHub Action.

|    Parameter     |                   Description                    |                        Default                        | Required |
|:----------------:|:------------------------------------------------:|:-----------------------------------------------------:|:--------:|
| DUOLINGO_USER_ID |            Your duolingo.com user ID             |                       730772122                       | **Yes**  |
|   COMMIT_EMAIL   |     Email used while committing to the repo      | 41898282+github-actions[bot]@users.noreply.github.com |    No    |
|    COMMIT_MSG    | Commit message used while committing to the repo |      💬 Updated README with your duolingo stats       |    No    |
| COMMIT_USERNAME  |    Username used while committing to the repo    |                  duolingo-stats-bot                   |    No    |
|    FILE_NAME     |       Define a specific file in your repo        |                       README.md                       |    No    |
|  SHOW_LANGUAGES  |            Toggle the languages table            |                         true                          |    No    |
| SHOW_FROM_ENGLISH| Determines, whether "(from English)" should be appended to languages learnt from English | false | No |
| ADVANCED_TOKEN_CSRF | One of the cookies necessary to get league info. PLEASE, ONLY PASS VIA GITHUB REPO SECRETS <3 | none | *For certain functions* |
| ADVANCED_TOKEN_JWT | One of the cookies necessary to get league info. PLEASE, ONLY PASS VIA GITHUB REPO SECRETS <3 | none | *For certain functions* |
| SHOW_LEAGUE* | Show the user's league in the overview table. *Requires **ADVANCED_TOKEN_CSRF** and **ADVANCED_TOKEN_JWT**.* If you use this, I recommend you to add `- cron: '0 0 * * 1'` to the scheduling. | true | No |
| XP_THIS_WEEK* | Show the user's XP earned since last leaderboard reset. *Requires **ADVANCED_TOKEN_CSRF** and **ADVANCED_TOKEN_JWT**.* If you use this, I recommend you to add `- cron: '0 0 * * 1'` to the scheduling. | false | No
