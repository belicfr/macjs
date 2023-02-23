const OS_INSTALLATION_SUBMIT_BUTTON
    = document.querySelector("section#installer_os button[button-action='nextSection']");
const ADMIN_SESSION_CREATION_SUBMIT_BUTTON
    = document.querySelector("section#installer_first_session button[button-action='nextSection']");

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
        case "installer_os":
            if (DEVICE_NAME.value.length
                && DEVICE_NAME.value.length <= DEVICE_NAME_MAX_LENGTH
                && syntaxPrecepts.validate(DEVICE_NAME.value, syntaxPrecepts.deviceName)
                && LANGUAGE.value in system.availableLanguages
                && PRODUCT.value in system.availableProducts) {

                OS_INSTALLATION_SUBMIT_BUTTON.removeAttribute("disabled");

            } else {
                OS_INSTALLATION_SUBMIT_BUTTON.setAttribute("disabled", "disabled");
            }
            break;

        case "installer_first_session":
            if (SESSION_NAME.value.length
                && SESSION_NAME.value.length <= SESSION_NAME_MAX_LENGTH
                && SESSION_PASSWORD.value.length) {

                console.log("nice!");

                ADMIN_SESSION_CREATION_SUBMIT_BUTTON.removeAttribute("disabled");

            } else {
                ADMIN_SESSION_CREATION_SUBMIT_BUTTON.setAttribute("disabled", "disabled");
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