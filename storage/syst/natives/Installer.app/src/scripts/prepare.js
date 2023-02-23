const OS_INSTALLATION_SUBMIT_BUTTON
    = document.querySelector("section#installer_os button[button-action='nextSection']");

setInterval(() => {
    /*
     * Update form validity:
     * - toggle [disabled] attribute to form submit button
     * - show/hide errors on inputs
     */

    updateFormValidity();
}, 3_000);

function updateFormValidity(section) {
    switch (section) {
        case "os_installer":
            if (isFormValid()) {
                OS_INSTALLATION_SUBMIT_BUTTON.removeAttribute("disabled");
            } else {
                OS_INSTALLATION_SUBMIT_BUTTON.setAttribute("disabled", "disabled");
            }
            break;

        default:
            break;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    windows.prepareAll();
    audio.prepareActiveButtonsToBeep();
});