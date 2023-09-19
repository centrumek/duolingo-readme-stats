import {Course} from "./types";
import {getEmoji} from "language-flag-colors";
import {spawn} from "node:child_process";
import {setFailed} from "@actions/core";

export const START_TOKEN = '<!--START_SECTION:duolingoStats-->';
export const END_TOKEN = '<!--END_SECTION:duolingoStats-->';
export const INFO_LINE = '<!-- Automatically generated with https://github.com/centrumek/duolingo-readme-stats-->\n';

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

export const formatOverviewTable = (username: string, streak: number, totalXp: number): string => {
    const tableHeader = `| Username | Streak | Total XP |`;
    const tableSeparator =
        '|' + Array.from({length: 3}, () => ':---:|').join('');
    const data = [
        '👤 ' + username ?? 'N/A',
        '🔥 ' + streak ?? 'N/A',
        '⚡ ' + totalXp ?? 'N/A'
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
            getEmoji(course.title) + ' ' + course.title,
            '👑 ' + course.crowns,
            '⚡ ' + course.xp
        ];
        return `| ${data.join(' | ')} |`;
    }).join('\n');

    return `${tableHeader}\n${tableSeparator}\n${rows}\n`;
};

export const setFailure = (error: string) => {
    console.error(error);
    setFailed(error);
};