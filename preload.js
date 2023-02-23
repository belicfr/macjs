const { contextBridge } = require("electron");
const path = require("path");
const gsap = require("gsap").gsap;
const sound = require("sound-play");

/*
 * DOM dependents APIs
 */
document.addEventListener("DOMContentLoaded", () => {
    /*
     * jQuery requiring
     */

    window.$ = window.jquery = require("jquery");

    /*
     * APIs
     */

    const WINDOWS = {
        /**
         * Prepare all created windows (add corners, other required
         * components...).
         * WARNING: must be used in DOMContentLoaded listener.
         */
        prepareAll: () => {
            const ALL_WINDOWS = document.querySelectorAll(".window");

            ALL_WINDOWS.forEach(wind => WINDOWS.prepare(wind));
        },

        /**
         * Prepare given window (add corners, other required
         * components...).
         * WARNING: must be used in DOMContentLoaded listener.
         * @param wind Given window to prepare
         */
        prepare: wind => {
            if (wind.hasAttribute("window-resize")) {
                const WINDOW_RESIZE_ATTR
                    = wind.getAttribute("window-resize").split(' ');

                if (WINDOW_RESIZE_ATTR.includes("tl")) {
                    wind.innerHTML
                        += `<div class="window-system-corner corner-tl"></div>`;
                }

                if (WINDOW_RESIZE_ATTR.includes("tr")) {
                    wind.innerHTML
                        += `<div class="window-system-corner corner-tr"></div>`;
                }

                if (WINDOW_RESIZE_ATTR.includes("bl")) {
                    wind.innerHTML
                        += `<div class="window-system-corner corner-bl"></div>`;
                }

                if (WINDOW_RESIZE_ATTR.includes("br")) {
                    wind.innerHTML
                        += `<div class="window-system-corner corner-br"></div>`;
                }
            }

            if (wind.hasAttribute("window-primitive-commands")) {
                const WINDOW_PRIMITIVE_COMMANDS_ATTR
                    = wind.getAttribute("window-primitive-commands").split(' ');
                const WINDOW_PRIMITIVE_COMMANDS_CONTAINER
                    = NODES.getChild(
                    wind,
                    ".window-header",
                    ".window-primitive-commands"
                );

                if (WINDOW_PRIMITIVE_COMMANDS_ATTR.includes("close")) {
                    WINDOW_PRIMITIVE_COMMANDS_CONTAINER[0].innerHTML +=
                        `
                        <div class="close"></div>
                        `;
                }

                if (WINDOW_PRIMITIVE_COMMANDS_ATTR.includes("minimize")) {
                    WINDOW_PRIMITIVE_COMMANDS_CONTAINER[0].innerHTML +=
                        `
                        <div class="minimize"></div>
                        `;
                }

                if (WINDOW_PRIMITIVE_COMMANDS_ATTR.includes("resize")) {
                    WINDOW_PRIMITIVE_COMMANDS_CONTAINER[0].innerHTML +=
                        `
                        <div class="resize"></div>
                        `;
                }
            }
        },
    };

    const NODES = {
        /**
         * Get (grand)child by using "nested" selectors.
         * WARNING: must be used in DOMContentLoaded listener.
         * @param element Reference for selectors
         * @param selectors Nested selectors to find child
         * @returns {*} Child jQuery object
         */
        getChild: (element, ...selectors) => {
            let child = window.$(element);

            selectors.forEach(selector => {
                child = child.children(selector);
            });

            return child;
        },
    };

    const AUDIO = {
        /**
         * Set listener for all not disabled buttons to play
         * Media Keys audio on click.
         * WARNING: must be used in DOMContentLoaded listener.
         */
        prepareActiveButtonsToBeep: () => {
            $(document).on("click", "button:not([disabled])", () => {
                sound.play(
                    path.join(__dirname, "storage/syst/audio/media_keys.mp3")
                );
            });
        },
    };

    /*
     * APIs exposing
     */

    contextBridge.exposeInMainWorld("nodes", NODES);
    contextBridge.exposeInMainWorld("windows", WINDOWS);
    contextBridge.exposeInMainWorld("audio", AUDIO);
});

/*
 * APIs
 */

const PACKAGE_MANAGER = {
    /**
     * Include CSS file from another location in storage with
     * absolute root path concatenated to given relative path.
     * @param relativePath Given relative path to concatenate after
     *                     absolute root path
     */
    includeCSS: relativePath => {
        const HEAD = document.querySelector("head");

        HEAD.innerHTML
            += `<link rel="stylesheet" href="${
                path.join(__dirname, "node_modules", relativePath)
            }" />`;
    },
};

const SYSTEM_ANIMATION = {
    /**
     * Create animation with GSAP library.
     * @param timeline Timeline object to use with GSAP
     */
    animate: timeline => {
        const TL = new gsap.timeline({paused: false});

        timeline.forEach(step => {
            if (step.type === "add") {
                TL[step.type](step.data);
            } else {
                TL[step.type](step.element, step.data);
            }
        });

        TL.play();
    },
};

const APPLICATIONS = {
    /**
     * Open MacJS native application.
     * @param nativeName MacJS native application name
     * @param optionalInternalPath Optional relative path in native
     *                             root folder
     */
    openNative: (nativeName, optionalInternalPath="src/views/Index.html") => {
        window.location = path.join(__dirname,
            "storage/syst/natives",
            nativeName,
            optionalInternalPath);
    },
};

const SYNTAX_PRECEPTS = {
    deviceName: RegExp("^([a-z0-9_]+)$"),

    validate: (string, regex) => {
        return string.match(regex);
    },
};

const SYSTEM = {
    /**
     * Available languages in MacJS system.
     */
    availableLanguages: {
        "en_US": "English (USA)",
    },

    /**
     * Available products for activation.
     */
    availableProducts: {
        "macjs_beta": "MacJS Beta",
    },
};

/*
 * APIs exposing
 */

contextBridge.exposeInMainWorld("packages", PACKAGE_MANAGER);
contextBridge.exposeInMainWorld("animation", SYSTEM_ANIMATION);
contextBridge.exposeInMainWorld("applications", APPLICATIONS);
contextBridge.exposeInMainWorld("syntaxPrecepts", SYNTAX_PRECEPTS);
contextBridge.exposeInMainWorld("system", SYSTEM);