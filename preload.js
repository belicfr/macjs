const { contextBridge } = require("electron");
const path = require("path");
const gsap = require("gsap").gsap;

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
        getChild: (element, ...selectors) => {
            let child = window.$(element);

            selectors.forEach(selector => {
                child = child.children(selector);
            });

            return child;
        },
    };

    /*
     * APIs exposing
     */

    contextBridge.exposeInMainWorld("nodes", NODES);
    contextBridge.exposeInMainWorld("windows", WINDOWS);
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

/*
 * APIs exposing
 */

contextBridge.exposeInMainWorld("packages", PACKAGE_MANAGER);
contextBridge.exposeInMainWorld("animation", SYSTEM_ANIMATION);
contextBridge.exposeInMainWorld("applications", APPLICATIONS);