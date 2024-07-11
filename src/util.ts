import {Course,XPGain} from "./types";
import {spawn} from "node:child_process";
import {setFailed} from "@actions/core";
import { SHOW_FROM_ENGLISH, SHOW_STREAK_TIMEZONE } from "./main";

export const START_TOKEN = '<!--START_SECTION:duolingoStats-->';
export const END_TOKEN = '<!--END_SECTION:duolingoStats-->';
export const INFO_LINE = '<!-- Automatically generated with https://github.com/centrumek/duolingo-readme-stats-->\n';

export const langsISO: { [key: string]: string } = {
    "en": "English",
    "ar": "Arabic",
    "bn": "Bangla",
    "hi": "Hindi",
    "te": "Telugu",
    "zh": "Chinese",
    "cs": "Czech",
    "nl": "Dutch",
    "fr": "French",
    "de": "German",
    "el": "Greek",
    "hu": "Hungarian",
    "id": "Indonesian",
    "it": "Italian",
    "ja": "Japanese",
    "ko": "Korean",
    "pl": "Polish",
    "pt": "Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "es": "Spanish",
    "tl": "Tagalog",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "vi": "Vietnamese",
};

export const courseFlags: { [key: string]: string } = {
	"Arabic": "arabic.svg",
    "Chinese": "chinese.svg",
    "Chinese (Cantonese)": "chinese.svg",
    "Czech": "czech.svg",
	"Danish": "danish.svg",
	"Dutch": "dutch.svg",
	"English": "english.svg", 
	"Esperanto": "esperanto.svg",
	"Finnish": "finnish.svg",
	"French": "french.svg",
	"German": "german.svg",
	"Greek": "greek.svg",
	"Guarani": "guarani.svg",
	"Haitian Creole": "haitian-creole.svg",
	"Hawaiian": "hawaiian.svg",
	"Hebrew": "hebrew.svg",
	"High Valyrian": "high-valyrian.svg",
	"Hindi": "hindi.svg",
	"Hungarian": "hungarian.svg",
    "Indonesian": "indonesian.svg",
    "Intermediate English": "english.svg", 
	"Irish": "irish.svg",
	"Italian": "italian.svg",
	"Japanese": "japanese.svg",
	"Klingon": "klingon.svg",
	"Korean": "korean.svg",
	"Latin": "latin.svg",
	"Navajo": "navajo.svg",
	"Norwegian (Bokmål)": "norwegian.svg",
	"Polish": "polish.svg",
	"Portuguese": "portuguese.svg",
	"Romanian": "romanian.svg",
	"Russian": "russian.svg",
	"Scottish Gaelic": "scottish-gaelic.svg",
	"Spanish": "spanish.svg", 
	"Swahili": "swahili.svg",
	"Swedish": "swedish.svg",
	"Turkish": "turkish.svg",
	"Ukrainian": "ukrainian.svg",
	"Vietnamese": "vietnamese.svg",
	"Welsh": "welsh.svg",
    "Yiddish": "yiddish.svg",
    "Zulu": "zulu.svg"
};

export function getEmoji(title: string) {
    const string = `<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/langs/${courseFlags[title]}" height="12">`;
    return string;
}

export const commitFile = async (filename: string, message: string, username: string, email: string) => {
    await exec('git', [
        'config',
        '--global',
        'user.email',
        email
    ]);
    await exec('git', ['config', '--global', 'user.name', username]);
    await exec('git', ['add', filename]);
    await exec('git', ['commit', '-m', message]);
    await exec('git', ['push']);
};

const exec = (cmd: string, args: string[] = []) =>
    new Promise((resolve, reject) => {
        const childProcess = spawn(cmd, args, {stdio: 'pipe'});
        let stdout = '';
        childProcess.stdout.on('data', data => {
            stdout = data;
        });
        childProcess.on('close', code => {
            if (code !== 0 && !stdout.includes('nothing to commit')) {
                const err = new Error(`[CHILD PROCESS] Invalid status code: ${code}`);
                return reject(err);
            }
            return resolve(code);
        });
        childProcess.on('error', reject);
    });

export const formatOverviewTable = (username: string, streak: number, streakExtendedToday: boolean | null, totalXp: number, xpThisWeek: XPGain[] | false, leagueID: number | false, streakTimeZone: string | false): string => {
    const leagues = ["Bronze", "Silver", "Gold", "Sapphire", "Ruby", "Emerald", "Amethyst", "Pearl", "Obsidian", "Diamond"]
    const tableHeader = `| Username | Day Streak${SHOW_STREAK_TIMEZONE === true && streakTimeZone ? " (" + new Intl.DateTimeFormat('en-UK', { timeZone: streakTimeZone, timeZoneName: 'short' }).format(new Date()).split(", ")[1] + ")" : ""} | Total XP |${xpThisWeek === false ? "" : " XP This Week |"}${leagueID === false ? "" : " League |"}`;
    const tableSeparator =
        '|' + Array.from({length: 3 + (leagueID === false ? 0 : 1) + (xpThisWeek === false ? 0 : 1)}, () => ':---:|').join('');
    const data = [
        '<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/duolingo.png" height="12"> ' + username ?? 'N/A',
        `<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/streak${streakExtendedToday == true ? 'active' : streakExtendedToday == false ? 'inactive' : 'frozen'}.svg" height="12"> ` + streak ?? 'N/A',
        '<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> ' + totalXp ?? 'N/A'
    ];

    if (xpThisWeek !== false) {
        const now = new Date();
        const lastReset = new Date(now);
        lastReset.setUTCHours(0, 0, 0, 0);
        const dayOfWeek = lastReset.getUTCDay();
        const daysSinceReset = (dayOfWeek + 6) % 7;
        lastReset.setUTCDate(now.getUTCDate() - daysSinceReset);
        const lastResetTimestamp = Math.floor(lastReset.getTime() / 1000);
        const recentXpGains = xpThisWeek.filter(gain => gain.time > lastResetTimestamp);
        const totalXpSinceReset = recentXpGains.reduce((total, gain) => total + gain.xp, 0);
        data.push('<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> ' + totalXpSinceReset ?? 'N/A');
    }

    if (leagueID !== false)
        data.push(`<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/leagues/${leagues[leagueID].toLowerCase()}.png" height="12"> ` + leagues[leagueID] ?? 'N/A');

    const row = `| ${data.join(' | ')} |`;

    return `${tableHeader}\n${tableSeparator}\n${row}\n`;
};

export const formatLanguagesTable = (courses: Course[]): string => {
	courses.sort((a, b) => b.xp - a.xp);
    const tableHeader = `| Language | XP |`;
    const tableSeparator =
        '|' + Array.from({length: 2}, () => ':---:|').join('');

    const rows = courses.map(course => {
        const data = [
            getEmoji(course.title) + ' ' + course.title + (course.fromLanguage == "en" ? SHOW_FROM_ENGLISH ? ` (from ${getEmoji("English")} English)` : "" : ` (from ${getEmoji(langsISO[course.fromLanguage])} ${langsISO[course.fromLanguage]})`),
            '<img src="https://raw.githubusercontent.com/RichardKanshen/duolingo-readme-stats/main/assets/xp.svg" height="12"> ' + course.xp
        ];
        return `| ${data.join(' | ')} |`;
    }).join('\n');

    return `${tableHeader}\n${tableSeparator}\n${rows}\n`;
};

export const setFailure = (error: string) => {
    console.error(error);
    setFailed(error);
};
