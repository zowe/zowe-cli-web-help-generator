# Zowe CLI Web Help Generator

## About the Generator

This repository introduces some utilities that can be used to extract the command tree from the CLI and Plug-ins, store the relevant command groups for third party conformant plugins in a legal-approved way (without exposing proprietary code), and generate a web help with those plug-ins included on demand.

---

## Installing

To install the necessary components, run `npm install`. For a minimal install, try `npm install --prod`.

---

## Using - Contributing to the Web Help

To add your conformant plug-in's commands, please perform the following steps:

1. Ensure the plug-in that you would like to contribute to the Web Help is installed in Zowe CLI. You can use `npx zowe plugins install <plugin name or path here>` if you do not have a globally installed Zowe CLI available.
2. Copy the template file `zowe.template.json` to `zowe.json` in the root of the project. This file is ignored by git. Customize this file to include the full names of command group(s) of your plugin(s), and the name(s) of your plugin's profile(s), like the following:

        {
          "commandGroups": ["zos-files", "zos-jobs"],
          "profiles": ["zosmf", "base"]
        }
    *Note: No @zowe scoped plug-ins should be included in this repository, and the above is merely for demonstration purposes.*

3. (Optional) Include your Copyright. Add your copyright text to a file named `.copyright` in the root of the repository. This file will be ignored by git. If no copyright is supplied, the following default copyright will be added:

        Copyright Contributors to the Zowe Project.

4. Run the `npm run contribute` command. This will retrieve the CLI command tree from Zowe CLI and all installed plug-ins, and extract the above command group(s) and profile(s) to the commandGroups and profiles directories.
5. Commit the newly created files. Ensure the commit is signed off.

---

## Using - Generating the Web Help

1. Install the latest CLI, and all @zowe scoped plug-ins. The CLI can also be accessed in this repository with `npx zowe`. 
2. Run the `npm run build` command. This will generate the CLI command tree from the CLI and @zowe packages, merge all of the command groups in the defined folders, and generate the web help in the generatedWebHelp directory.
