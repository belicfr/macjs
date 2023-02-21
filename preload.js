const { contextBridge } = require("electron");
const path = require("path");
const gsap = require("gsap").gsap;

const PACKAGE_MANAGER = {
    include: relativePath => {
        const HEAD = document.querySelector("head");

        HEAD.innerHTML
            += `<link rel="stylesheet" href="${
                path.join(__dirname, "node_modules", relativePath)
            }" />`;
    },
};

const SYSTEM_ANIMATION = {
    animate: timeline => {
        const TL = new gsap.timeline({paused: false});

        timeline.forEach(step => {
            // FIXME: fix gsap delay attribute.
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
    openNative: (nativeName, optionalInternalPath="src/views/Index.html") => {
        window.location = path.join(__dirname,
            "storage/syst/natives",
            nativeName,
            optionalInternalPath);
    },
};

contextBridge.exposeInMainWorld("packages", PACKAGE_MANAGER);
contextBridge.exposeInMainWorld("animation", SYSTEM_ANIMATION);
contextBridge.exposeInMainWorld("applications", APPLICATIONS);