/*
* This program and the accompanying materials are made available under the terms of the *
* Eclipse Public License v2.0 which accompanies this distribution, and is available at  *
* https://www.eclipse.org/legal/epl-v20.html                                            *
*                                                                                       *
* SPDX-License-Identifier: EPL-2.0                                                      *
*                                                                                       *
* Copyright Contributors to the Zowe Project.                                           *
*                                                                                       *
*/

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { jsonc as JSONC } from 'jsonc';
const wrap = require("word-wrap");

(async() => {
    // Read and parse the files
    const zoweFile = join(__dirname, "..", "zowe.json");
    const zoweFileJSON = JSONC.parse(readFileSync(zoweFile).toString());
    const zoweTreeFile = join(__dirname, "..", "commandTree.json");
    const zoweTreeFileJSON = JSONC.parse(readFileSync(zoweTreeFile).toString());
    const commandTree = zoweTreeFileJSON.data;
    const commandGroups = zoweFileJSON.commandGroups;
    let commandGroupsFound = 0;

    // Prepare to add copyrights to files
    let copyright: string;
    const copyrightPath = join(__dirname, "../", ".copyright");
    const wrapOptions = {indent: "// ", width: 77, trim: true};
    if (existsSync(copyrightPath)) {
        console.log("A copyright was found and will be used on all created files.");
        copyright = wrap(readFileSync(copyrightPath).toString(), wrapOptions);
    } else {
        const zoweCopyright = "Copyright Contributors to the Zowe Project.";
        console.log("No copyright file found, using default Zowe Copyright.");
        copyright = wrap(zoweCopyright, wrapOptions);
    }

    // Set up the directories, make sure they exist.
    const commandGroupsDirectory = join(__dirname, "..", "commandGroups");
    if (!existsSync(commandGroupsDirectory)) { mkdirSync(commandGroupsDirectory); }

    // Save the command groups
    for (const commandGroupSearching of commandGroups) {
        for (const commandGroup of commandTree.children) {
            if (commandGroup.name === commandGroupSearching) {
                // We found the command group. Save it, and break out of the inner for loop.
                const commandGroupFilePath = join(__dirname, "..", "commandGroups", commandGroupSearching + ".jsonc");
                commonWriteFileSync(commandGroupFilePath, commandGroup, copyright);
                console.log("Command Group " + commandGroupSearching + " was found and saved to: " + resolve(commandGroupFilePath));
                commandGroupsFound++;
                break;
            }
        }
    }

    console.log("Script completed.");
    if (commandGroupsFound !== commandGroups.length) { console.log("Not all requested command groups were found. Please review script output."); }
})().catch((error) => {
    console.log(error);
    process.exit(1);
});

function commonWriteFileSync(path: string, json: any, copyright: string) {
    const data = copyright + "\n" + JSONC.stringify(
        json,
        (key, value) => (key !== "handler") ? value : "",
        2
    );
    writeFileSync(path, data);
}