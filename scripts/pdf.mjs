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

import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    // GitHub-hosted Linux runners cannot use Chrome's sandbox.
    args: process.env.CI === "true" ? ["--no-sandbox"] : []
});

try {
    const page = await browser.newPage();
    await page.goto(new URL("../generatedWebHelp/docs/all.html", import.meta.url).href);
    const outputPath = fileURLToPath(new URL("../zowe.pdf", import.meta.url));
    await page.pdf({
        path: outputPath,
        format: "Letter",
        printBackground: true,
        margin: {
            top: "0.4in",
            right: "0.4in",
            bottom: "0.4in",
            left: "0.4in"
        }
    });
    console.log(`PDF generated at ${outputPath}`);
} finally {
    await browser.close();
}
