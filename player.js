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


    try {

        fs.appendFileSync(
            logFile,
            text
        );

    }

    catch(e){

        console.log(
            "Log Error:",
            e.message
        );

    }

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

                "--no-sandbox",

                "--disable-setuid-sandbox",

                "--disable-dev-shm-usage",

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



        writeLog(
            "Page loaded"
        );



        try {


            await page.keyboard.press("k");


            writeLog(
                "Play command sent"
            );


        }

        catch(e){

            writeLog(
                "Play command failed"
            );

        }



        writeLog(

            "Playing for "
            + duration
            + " seconds"

        );



        try {


            await page.waitForTimeout(

                duration * 1000

            );


        }

        catch(e){


            writeLog(

                "Page closed during playback"

            );


        }



        writeLog(

            "Closing browser"

        );



        if(browser){


            await browser.close();


        }



        writeLog(

            "Browser closed successfully"

        );


        return true;



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



        return false;


    }


}



module.exports = playPlaylist;
