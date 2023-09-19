import http from 'https';
import {getUserDetails} from "./api";
import * as fs from "fs";
import {END_TOKEN, formatLanguagesTable, formatOverviewTable, INFO_LINE, START_TOKEN} from "./util";
import {UserDetailsResponse} from "./types";

// Public parameters
export const FILE_NAME = 'DEMO_README.md';



(async () => {


    const content: string[] = [];

    const userDetails: UserDetailsResponse = await getUserDetails('730772122');
    content.push(formatOverviewTable(userDetails.username, userDetails.streak, userDetails.totalXp));
    content.push(formatLanguagesTable(userDetails.courses));

    const readmeContent = fs.readFileSync('./' + FILE_NAME, 'utf-8')

    const startIndex = readmeContent.indexOf(START_TOKEN);
    if (startIndex === -1) {
        throw new Error(
            `Couldn't find the START_TOKEN ${START_TOKEN} - Exiting!`
        );
    }

    const endIndex = readmeContent.indexOf(END_TOKEN);
    if (endIndex === -1) {
        throw new Error(`Couldn't find the END_TOKEN ${END_TOKEN} - Exiting!`);
    }

    const oldPart = readmeContent.slice(startIndex, endIndex);

    const readmeSafeParts = readmeContent.split(oldPart);

    const newReadme = `${
        readmeSafeParts[0]
    }${START_TOKEN}\n${INFO_LINE}\n${content.join('\n')}\n${
        readmeSafeParts[1]
    }`;

    fs.writeFileSync('./' + FILE_NAME, newReadme);
})()