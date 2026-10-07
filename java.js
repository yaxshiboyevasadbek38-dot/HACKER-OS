/* =========================================
   HACKER OS
   MAIN SYSTEM
========================================= */


/* =========================================
   BOOT SYSTEM
========================================= */

const bootScreen =
    document.getElementById("bootScreen");

const bootBar =
    document.getElementById("bootBar");

const bootText =
    document.getElementById("bootText");


const bootMessages = [
    "Loading kernel...",
    "Initializing memory...",
    "Starting security layer...",
    "Connecting to NEXUS...",
    "Loading desktop...",
    "System ready."
];


let bootProgress = 0;


const bootInterval =
    setInterval(() => {

        bootProgress +=
            Math.floor(
                Math.random() * 8
            ) + 3;


        if (bootProgress > 100) {
            bootProgress = 100;
        }


        bootBar.style.width =
            bootProgress + "%";


        const messageIndex =
            Math.min(
                Math.floor(
                    bootProgress /
                    17
                ),
                bootMessages.length - 1
            );


        bootText.textContent =
            bootMessages[messageIndex];


        if (bootProgress >= 100) {

            clearInterval(
                bootInterval
            );


            setTimeout(() => {

                bootScreen.style.opacity =
                    "0";


                setTimeout(() => {

                    bootScreen.style.display =
                        "none";


                    showNotification(
                        "SYSTEM",
                        "Hacker OS successfully started."
                    );

                }, 700);

            }, 500);
        }

    }, 100);


/* =========================================
   CLOCK
========================================= */

function updateClock() {

    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    document.getElementById(
        "topClock"
    ).textContent =
        `${hours}:${minutes}:${seconds}`;


    document.getElementById(
        "taskTime"
    ).textContent =
        `${hours}:${minutes}`;
}


updateClock();


setInterval(
    updateClock,
    1000
);


/* =========================================
   APP MANAGEMENT
========================================= */

const apps = [
    "terminal",
    "files",
    "browser",
    "calculator",
    "settings"
];


const appNames = {
    terminal: "Terminal",
    files: "Files",
    browser: "Browser",
    calculator: "Calculator",
    settings: "Settings"
};


let zIndex = 100;


function openApp(appId) {

    const app =
        document.getElementById(
            appId
        );


    if (!app) return;


    app.classList.add("active");


    zIndex++;

    app.style.zIndex =
        zIndex;


    createTaskButton(
        appId
    );


    closeStartMenu();


    if (appId === "terminal") {

        setTimeout(() => {

            document.getElementById(
                "terminalInput"
            ).focus();

        }, 100);

    }

}


function closeApp(appId) {

    const app =
        document.getElementById(
            appId
        );


    if (!app) return;


    app.classList.remove(
        "active"
    );


    removeTaskButton(
        appId
    );
}


function minimizeApp(appId) {

    const app =
        document.getElementById(
            appId
        );


    app.classList.remove(
        "active"
    );

}


function maximizeApp(appId) {

    const app =
        document.getElementById(
            appId
        );


    app.classList.toggle(
        "maximized"
    );

}


/* =========================================
   TASKBAR
========================================= */

const taskApps =
    document.getElementById(
        "taskApps"
    );


function createTaskButton(appId) {

    if (
        document.getElementById(
            "task-" + appId
        )
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "task-" + appId;


    button.className =
        "task-app active";


    button.textContent =
        appNames[appId];


    button.onclick = () => {

        const app =
            document.getElementById(
                appId
            );


        if (
            app.classList.contains(
                "active"
            )
        ) {

            app.classList.remove(
                "active"
            );

        } else {

            app.classList.add(
                "active"
            );

            zIndex++;

            app.style.zIndex =
                zIndex;

        }

    };


    taskApps.appendChild(
        button
    );
}


function removeTaskButton(appId) {

    const button =
        document.getElementById(
            "task-" + appId
        );


    if (button) {

        button.remove();

    }
}


/* =========================================
   START MENU
========================================= */

const startMenu =
    document.getElementById(
        "startMenu"
    );


function toggleStartMenu() {

    startMenu.classList.toggle(
        "show"
    );

}


function closeStartMenu() {

    startMenu.classList.remove(
        "show"
    );

}


function openFromMenu(appId) {

    openApp(appId);

}


/* =========================================
   TERMINAL
========================================= */

const terminalInput =
    document.getElementById(
        "terminalInput"
    );

const terminalOutput =
    document.getElementById(
        "terminalOutput"
    );


terminalInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Enter"
        ) {

            return;

        }


        const command =
            terminalInput.value
                .trim()
                .toLowerCase();


        if (!command) return;


        addTerminalLine(
            "root@nexus:~$ " +
            command
        );


        processCommand(
            command
        );


        terminalInput.value = "";

    }
);


function addTerminalLine(
    text,
    className = ""
) {

    const line =
        document.createElement(
            "p"
        );


    line.className =
        className;


    line.textContent =
        text;


    terminalOutput.insertBefore(
        line,
        terminalOutput.querySelector(
            ".terminal-input"
        )
    );


    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}


function processCommand(
    command
) {

    switch (command) {

        case "help":

            addTerminalLine(
                "Available commands:",
                "green-text"
            );

            addTerminalLine(
                "help   - show commands"
            );

            addTerminalLine(
                "clear  - clear terminal"
            );

            addTerminalLine(
                "time   - show system time"
            );

            addTerminalLine(
                "date   - show system date"
            );

            addTerminalLine(
                "status - system status"
            );

            addTerminalLine(
                "files  - open file manager"
            );

            addTerminalLine(
                "calc   - open calculator"
            );

            break;


        case "clear":

            const lines =
                terminalOutput.querySelectorAll(
                    "p"
                );


            lines.forEach(
                line => {

                    if (
                        !line.classList.contains(
                            "terminal-input"
                        )
                    ) {

                        line.remove();

                    }

                }
            );

            break;


        case "time":

            addTerminalLine(
                new Date()
                    .toLocaleTimeString(),
                "cyan-text"
            );

            break;


        case "date":

            addTerminalLine(
                new Date()
                    .toLocaleDateString(),
                "cyan-text"
            );

            break;


        case "status":

            addTerminalLine(
                "SYSTEM: ONLINE",
                "green-text"
            );

            addTerminalLine(
                "SECURITY: ACTIVE",
                "green-text"
            );

            addTerminalLine(
                "NETWORK: SECURE",
                "green-text"
            );

            break;


        case "files":

            openApp("files");

            break;


        case "calc":

            openApp("calculator");

            break;


        case "whoami":

            addTerminalLine(
                "root@nexus // NETRUNNER",
                "cyan-text"
            );

            break;


        case "neofetch":

            addTerminalLine(
                "      ◈ HACKER OS",
                "cyan-text"
            );

            addTerminalLine(
                "      OS: NEXUS"
            );

            addTerminalLine(
                "      KERNEL: 6.6.13"
            );

            addTerminalLine(
                "      SHELL: NEXUS-SHELL"
            );

            addTerminalLine(
                "      SECURITY: ACTIVE",
                "green-text"
            );

            break;


        default:

            addTerminalLine(
                `Command not found: ${command}`,
                "red-text"
            );

    }

}


/* =========================================
   BROWSER
========================================= */

function navigateBrowser() {

    const input =
        document.getElementById(
            "browserInput"
        );


    const result =
        document.getElementById(
            "browserResult"
        );


    const value =
        input.value.trim();


    if (!value) {

        return;

    }


    result.textContent =
        "SCANNING " + value + " ...";


    result.style.color =
        "#ffd166";


    setTimeout(() => {

        result.textContent =
            "✓ CONNECTION SECURE // ACCESS GRANTED";


        result.style.color =
            "#00ff88";

    }, 1000);

}


/* =========================================
   CALCULATOR
========================================= */

let calcExpression = "";


function calcInput(value) {

    calcExpression += value;


    document.getElementById(
        "calcDisplay"
    ).value =
        calcExpression;

}


function clearCalc() {

    calcExpression = "";


    document.getElementById(
        "calcDisplay"
    ).value =
        "0";

}


function calculate() {

    try {

        const result =
            Function(
                `"use strict"; return (${calcExpression})`
            )();


        calcExpression =
            String(result);


        document.getElementById(
            "calcDisplay"
        ).value =
            result;

    }

    catch {

        document.getElementById(
            "calcDisplay"
        ).value =
            "ERROR";


        calcExpression = "";

    }

}


/* =========================================
   SETTINGS
========================================= */

function toggleCyberMode() {

    document.body.classList.toggle(
        "low-power"
    );


    showNotification(
        "SYSTEM",
        "Cyber mode configuration changed."
    );

}


function toggleScanlines() {

    const scanlines =
        document.querySelector(
            ".scanlines"
        );


    scanlines.style.display =
        scanlines.style.display ===
        "none"
            ? "block"
            : "none";

}


function toggleNeon() {

    document.body.classList.toggle(
        "no-neon"
    );

}


/* =========================================
   NOTIFICATION
========================================= */

function showNotification(
    title,
    message
) {

    const notification =
        document.getElementById(
            "notification"
        );


    notification.querySelector(
        "strong"
    ).textContent =
        title;


    notification.querySelector(
        "p"
    ).textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 3500);

}


/* =========================================
   SEARCH
========================================= */

const appSearch =
    document.getElementById(
        "appSearch"
    );


appSearch.addEventListener(
    "input",
    function() {

        const search =
            this.value.toLowerCase();


        document
            .querySelectorAll(
                ".start-apps button"
            )
            .forEach(button => {

                const text =
                    button.textContent
                        .toLowerCase();


                button.style.display =
                    text.includes(search)
                        ? "flex"
                        : "none";

            });

    }
);


/* =========================================
   SHUTDOWN
========================================= */

function shutdown() {

    const boot =
        document.getElementById(
            "bootScreen"
        );


    boot.style.display =
        "flex";

    boot.style.opacity =
        "1";


    bootText.textContent =
        "Shutting down system...";


    bootBar.style.width =
        "100%";


    setTimeout(() => {

        bootText.textContent =
            "SYSTEM OFFLINE";

    }, 1200);

}
