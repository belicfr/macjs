const BRAND_ICON = document.querySelector("#app > .brand-icon > i");

animation.animate([
    {
        type: "to",
        element: BRAND_ICON,
        data: {
            delay: 1,
            duration: 0,

            opacity: 1,
        },
    },
    {
        type: "add",
        data: () => {
            setTimeout(() => {
                applications.openNative("Installer.app");
            }, 5_000);
        },
    }
]);