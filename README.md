# Zowe CLI Web Help Generator

## About the Generator

This repository introduces utilities that extract the command tree from the CLI and its installed plug-ins, store the relevant command groups for third party conformant plugins in a legal-approved way (without exposing proprietary code), and generate web help with those plug-ins included on demand.

To contribute your plug-in's web help, follow the steps below for installing and using the project.

---

## Installing

1. Clone this repository from GitHub:
    ```bash
    git clone https://github.com/zowe/zowe-cli-web-help-generator.git
    cd zowe-cli-web-help-generator
    ```

2. Install project dependencies:
    ```bash
    npm install --prod
    ```
    > **Note:** If you plan to modify the scripts in this repo, omit the `--prod` flag to install dev dependencies as well.

3. Install the plug-in you want to contribute to the Web Help into Zowe CLI, if it is not already installed. If you do not have a globally installed Zowe CLI available, run:
    ```bash
    npx zowe plugins install <plugin name or path here>
    ```

---

## Using - Contributing to the Web Help

To add your conformant plug-in's commands, perform the following steps:
> **Note:** All steps should be performed in the root of this project.

1. _Ensure the plug-in you want to contribute to the Web Help is installed in Zowe CLI._<br>
    If it is not already installed, see step 3 above.

2. _Define command groups and profiles that your plug-in contributes._<br>
    Copy the template file `zowe.template.json` to a new file named `zowe.json`. This file will be ignored by git. Customize this file to include the full names of command group(s) of your plugin(s), and the name(s) of your plug-in's profile(s), like the following:
    ```json
    {
      "commandGroups": ["zowe-cli-sample"],
      "profiles": ["sample"]
    }
    ```
    > **Note:** No @zowe scoped plug-ins should be included in this repository, and the above is merely for demonstration purposes.

3. _(Optional) Include your copyright notice, which will show as a comment in the generated output._<br>
    Create a file named `.copyright` and add your copyright notice there. This file will be ignored by git. If no copyright is supplied, the following default copyright will be added:
    ```
    Copyright Contributors to the Zowe Project.
    ```

4. _Use the web help generator to extract help from your plug-in's command definitions._<br>
    Run the following command:
    ```bash
    npm run contribute
    ```
    This will retrieve the CLI command tree from Zowe CLI and all installed plug-ins, and extract the above command group(s) and profile(s) to `.jsonc` files in the "commandGroups" and "profiles" directories.

5. _Commit new files back to the GitHub repository._<br>
    Commit the newly created `.jsonc` files to git. Ensure the commit is signed off (it must include a "Signed-off-by" line).
    ```bash
    git commit -s -m "Add <plugin name> plugin"
    ```

    To include your plug-in in the next web help build, create a pull request in this repository on GitHub that contributes the new files.

---

## Using - Generating the Web Help

To preview web help with your plug-in included locally, perform the following steps:

1. _Ensure the latest CLI and plug-ins are installed to generate up-to-date help._<br>
    Install the latest version of Zowe CLI, and all @zowe scoped plug-ins (CICS, DB2, FTP, IMS, and MQ for Zowe v2) if they are not already installed. If you do not have a globally installed Zowe CLI available, the CLI can also be accessed in this repository by running `npx zowe`.

2. _Build web help that includes all plug-ins contributed to this repository._<br>
    In the root of this project, run:
    ```bash
    npm run build
    ```
    This will generate the CLI command tree from the CLI and @zowe packages, merge all of the command groups in the defined folders, and generate the web help in the "generatedWebHelp" directory.

    To view the generated web help, open the file "generatedWebHelp/index.html" in your browser.
