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
    const profilesDirectory = join(__dirname, "..", "profiles");
    const profilesCreateDirectory = join(profilesDirectory, "create");
    const profilesDeleteDirectory = join(profilesDirectory, "delete");
    const profilesListDirectory = join(profilesDirectory, "list");
    const profilesSetDefaultDirectory = join(profilesDirectory, "set-default");
    const profilesUpdateDirectory = join(profilesDirectory, "update");

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

    // Add the missing profiles
    for (const commandGroup of commandTree.children) {
        if (commandGroup.name === "profiles") {
            for (const child of commandGroup.children) {
                if (child.name === "create") {
                    if (existsSync(profilesCreateDirectory)) {
                        const files = readdirSync(profilesCreateDirectory);
                        for (const file of files) {
                            const profile = JSONC.parse(readFileSync(join(profilesCreateDirectory, file)).toString());
                            let conflict = false;
                            for (const compareProfile of child.children) {
                                if (profile.name === compareProfile.name) { conflict = true; }
                            }
                            if (!conflict) {
                                child.children.push(profile);
                                console.log("Profile " + profile.name + " was added to profiles create successfully.");
                            } else {
                                console.log("Profile " + profile.name + " was not added to profiles create due to a conflicting profile.");
                            }
                        }
                    }
                } else if (child.name === "delete") {
                    if (existsSync(profilesDeleteDirectory)) {
                        const files = readdirSync(profilesDeleteDirectory);
                        for (const file of files) {
                            const profile = JSONC.parse(readFileSync(join(profilesDeleteDirectory, file)).toString());
                            let conflict = false;
                            for (const compareProfile of child.children) {
                                if (profile.name === compareProfile.name) { conflict = true; }
                            }
                            if (!conflict) {
                                child.children.push(profile);
                                console.log("Profile " + profile.name + " was added to profiles delete successfully.");
                            } else {
                                console.log("Profile " + profile.name + " was not added to profiles delete due to a conflicting profile.");
                            }
                        }
                    }
                } else if (child.name === "list") {
                    if (existsSync(profilesListDirectory)) {
                        const files = readdirSync(profilesListDirectory);
                        for (const file of files) {
                            const profile = JSONC.parse(readFileSync(join(profilesListDirectory, file)).toString());
                            let conflict = false;
                            for (const compareProfile of child.children) {
                                if (profile.name === compareProfile.name) { conflict = true; }
                            }
                            if (!conflict) {
                                child.children.push(profile);
                                console.log("Profile " + profile.name + " was added to profiles list successfully.");
                            } else {
                                console.log("Profile " + profile.name + " was not added to profiles list due to a conflicting profile.");
                            }
                        }
                    }
                } else if (child.name === "set-default") {
                    if (existsSync(profilesSetDefaultDirectory)) {
                        const files = readdirSync(profilesSetDefaultDirectory);
                        for (const file of files) {
                            const profile = JSONC.parse(readFileSync(join(profilesSetDefaultDirectory, file)).toString());
                            let conflict = false;
                            for (const compareProfile of child.children) {
                                if (profile.name === compareProfile.name) { conflict = true; }
                            }
                            if (!conflict) {
                                child.children.push(profile);
                                console.log("Profile " + profile.name + " was added to profiles set-default successfully.");
                            } else {
                                console.log("Profile " + profile.name + " was not added to profiles set-default due to a conflicting profile.");
                            }
                        }
                    }
                } else if (child.name === "update") {
                    if (existsSync(profilesUpdateDirectory)) {
                        const files = readdirSync(profilesUpdateDirectory);
                        for (const file of files) {
                            const profile = JSONC.parse(readFileSync(join(profilesUpdateDirectory, file)).toString());
                            let conflict = false;
                            for (const compareProfile of child.children) {
                                if (profile.name === compareProfile.name) { conflict = true; }
                            }
                            if (!conflict) {
                                child.children.push(profile);
                                console.log("Profile " + profile.name + " was added to profiles update successfully.");
                            } else {
                                console.log("Profile " + profile.name + " was not added to profiles update due to a conflicting profile.");
                            }
                        }
                    }
                }
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