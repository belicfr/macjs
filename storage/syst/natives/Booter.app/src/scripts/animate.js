const BRAND_ICON = document.querySelector("#app > .brand-icon > i");

animation.animate([
    {
        type: "from",
        element: BRAND_ICON,
        data: {
            delay: 10,
            duration: 0,

            opacity: 0,
        },
    },
    {
        type: "add",
        data: () => {
            setTimeout(() => {
                applications.openNative("Booter.app")
            }, 5000);
        },
    }
]);