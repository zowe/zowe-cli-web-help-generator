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

import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { jsonc as JSONC } from 'jsonc';

(async() => {
    // Set up directories
    const zoweTreeFile = join(__dirname, "..", "commandTree.json");
    const commandGroupsDirectory = join(__dirname, "..", "commandGroups");

    // Read the file
    const zoweTreeFileJSON = JSONC.parse(readFileSync(zoweTreeFile).toString());
    const commandTree = zoweTreeFileJSON.data;

    // Add the missing command groups
    if (existsSync(commandGroupsDirectory)) {
        const commandGroupsFiles = readdirSync(commandGroupsDirectory);
        for (const file of commandGroupsFiles) {
            const commandGroup = JSONC.parse(readFileSync(join(commandGroupsDirectory, file)).toString());
            let conflict = false;
            for (const compareGroup of commandTree.children) {
                if (compareGroup.name === commandGroup.name) { conflict = true; }
            }

            if (!conflict) {
                commandTree.children.push(commandGroup);
                console.log("Command group " + commandGroup.name + " added successfully.");
            } else {
                console.log("Command group " + commandGroup.name + " was not added due to a conflicting command group.");
            }
        }
    }

    // Write data back to file
    zoweTreeFileJSON.data = commandTree;
    const dataToWrite = JSONC.stringify(zoweTreeFileJSON, (key, value) => (key !== "handler") ? value : "", 2);
    writeFileSync(zoweTreeFile, dataToWrite);
})().catch((error) => {
    console.log(error);
    process.exit(1);
});