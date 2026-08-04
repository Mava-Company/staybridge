const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");


const logFile = path.join(
    __dirname,
    "logs",
    "player.log"
);


function writeLog(message) {

    const time = new Date().toISOString();

    const text =
        `[${time}] ${message}\n`;

    console.log(message);

    fs.appendFileSync(
        logFile,
        text
    );

}



async function playPlaylist(url, duration) {


    let browser = null;


    try {


        writeLog(
            "Opening browser"
        );


        browser = await chromium.launch({

            headless:true,

            args:[

                "--start-maximized",

                "--disable-blink-features=AutomationControlled"

            ]

        });



        const context =
            await browser.newContext({

                viewport:null

            });



        const page =
            await context.newPage();



        writeLog(
            "Opening playlist: " + url
        );



        await page.goto(

            url,

            {

                waitUntil:"networkidle",

                timeout:60000

            }

        );



        await page.waitForTimeout(5000);



        try {


            await page.keyboard.press("k");


            writeLog(
                "Play command sent"
            );


        }

        catch(e){}



        writeLog(

            "Playing for "
            + duration
            + " seconds"

        );



        await page.waitForTimeout(

            duration * 1000

        );



        writeLog(

            "Closing browser"

        );



        await browser.close();



        writeLog(

            "Browser closed successfully"

        );



    }


    catch(error){


        writeLog(

            "Playwright Error: "
            + error.message

        );



        if(browser){


            try{


                await browser.close();


            }

            catch(e){}



        }



        throw error;


    }


}



module.exports = playPlaylist;