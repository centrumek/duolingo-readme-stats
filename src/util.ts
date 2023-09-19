import {Course} from "./types";
import {getEmoji} from "language-flag-colors";


export const START_TOKEN = '<!--START_SECTION:duolingoStats-->';
export const END_TOKEN = '<!--END_SECTION:duolingoStats-->';
export const INFO_LINE = '<!-- Automatically generated with https://github.com/centrumek/duolingo-readme-stats-->\n';

export const formatOverviewTable = (username: string, streak: number, totalXp: number): string => {
    const tableHeader = `| Username | Streak | Total XP |`;
    const tableSeparator =
        '|' + Array.from({length: 3}, () => ':---:|').join('');
    const data = [
        '👤 ' + username ?? 'No Username',
        '🔥 ' + streak ?? 'No Streak',
        '⚡ ' + totalXp ?? 'No Xp'
    ];

    const row = `| ${data.join(' | ')} |`;

    return `${tableHeader}\n${tableSeparator}\n${row}\n`;
};

export const formatLanguagesTable = (courses: Course[]): string => {
    const tableHeader = `| Language | Level | XP |`;
    const tableSeparator =
        '|' + Array.from({length: 3}, () => ':---:|').join('');

    const rows = courses.map(course => {
        const data = [
            getFlagEmoji(course.title) + ' ' + course.title,
            '👑 ' + course.crowns,
            '⚡ ' + course.xp
        ];
        return `| ${data.join(' | ')} |`;
    }).join('\n');

    return `${tableHeader}\n${tableSeparator}\n${rows}\n`;
};

const getFlagEmoji = (langCode: string) : string => {
    return getEmoji(langCode) ?? "";
}