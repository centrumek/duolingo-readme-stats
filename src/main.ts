import {getUserDetails} from "./api";
import * as fs from "fs";
import {
    commitFile,
    END_TOKEN,
    formatLanguagesTable,
    formatOverviewTable,
    INFO_LINE,
    setFailure,
    START_TOKEN
} from "./util";
import {UserDetailsResponse} from "./types";
import {getInput} from "@actions/core";

// Public parameters
export const FILE_NAME = getInput('FILE_NAME');
export const COMMIT_MSG = getInput('COMMIT_MSG');
export const COMMIT_USERNAME = getInput('COMMIT_MSG');
export const COMMIT_EMAIL = getInput('COMMIT_MSG');
export const IS_DEBUG = getInput('IS_DEBUG') === 'true';
export const SHOW_LANGUAGES = getInput('SHOW_LANGUAGES') === 'true';
export const DUOLINGO_USER_ID = getInput('DUOLINGO_USER_ID')?.toLowerCase();
export const SHOW_FROM_ENGLISH = getInput('SHOW_FROM_ENGLISH') === 'true';

(async () => {
    try {
        if (!DUOLINGO_USER_ID) {
            throw new Error('Duolingo user ID not provided!');
        }
        const content = await buildContent();
        updateFile(content);
        if (!IS_DEBUG) {
            await commitFile(FILE_NAME, COMMIT_MSG, COMMIT_USERNAME, COMMIT_EMAIL);
        }
        console.log('Successfully updated the README file!');
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : 'The action failed with an Unknown error';
        setFailure(errorMessage);
    }
})()

async function buildContent() {
    const content: string[] = [];

    const userDetails: UserDetailsResponse = await getUserDetails(DUOLINGO_USER_ID);
    content.push(formatOverviewTable(userDetails.username, userDetails.streak, userDetails.totalXp));

    if (SHOW_LANGUAGES) {
        if (userDetails.courses.length === 0) {
            throw new Error('No languages found!');
        }
        content.push(formatLanguagesTable(userDetails.courses));
    }

    return content;
}

function updateFile(content: string[]) {
    const readmeContent = fs.readFileSync('./' + FILE_NAME, 'utf-8')

    const startIndex = readmeContent.indexOf(START_TOKEN);
    if (startIndex === -1) {
        throw new Error(`Couldn't find the START_TOKEN ${START_TOKEN} - Exiting!`);
    }

    const endIndex = readmeContent.indexOf(END_TOKEN);
    if (endIndex === -1) {
        throw new Error(`Couldn't find the END_TOKEN ${END_TOKEN} - Exiting!`);
    }

    const oldPart = readmeContent.slice(startIndex, endIndex);
    const readmeSafeParts = readmeContent.split(oldPart);
    const newReadme = `${readmeSafeParts[0]}${START_TOKEN}\n${INFO_LINE}\n${content.join('\n')}\n${readmeSafeParts[1]}`;

    fs.writeFileSync('./' + FILE_NAME, newReadme);
}