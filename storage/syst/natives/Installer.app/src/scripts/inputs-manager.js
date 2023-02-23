// installer_os
const DEVICE_NAME = document.querySelector("input#device_name");
const DEVICE_NAME_ERRORS = document.querySelector("ul#device_name_errors");
const LANGUAGE = document.querySelector("select#language");
const LANGUAGE_ERRORS = document.querySelector("ul#language_errors");
const PRODUCT = document.querySelector("select#product");
const PRODUCT_ERRORS = document.querySelector("ul#product_errors");

// installer_first_session
const SESSION_NAME = document.querySelector("input#name");
const SESSION_PASSWORD = document.querySelector("input#password");
const SESSION_PASSWORD_HINT = document.querySelector("input#password_hint");

const INSTALLATION_STEPS_TO_VERIFY = [
    "installer_os", "installer_first_session",
];

const DEVICE_NAME_MAX_LENGTH = 25;
const SESSION_NAME_MAX_LENGTH = 25;

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        // Verify form values validity
        INSTALLATION_STEPS_TO_VERIFY.forEach(step => updateFormValidity(step));
    });
});

DEVICE_NAME.addEventListener("input", e => {
    let correctValue = e.target.value;

    // Set value to lowercase
    correctValue = correctValue.toLowerCase();

    // Replace spaces by underscores
    correctValue = correctValue.replaceAll(' ', '_');

    // Prevent forbidden characters
    if (!syntaxPrecepts.validate(correctValue, syntaxPrecepts.deviceName)) {
        correctValue = correctValue.slice(0, correctValue.length - 1);
    }

    // Change input value for correct value
    DEVICE_NAME.value = correctValue;
});

LANGUAGE.addEventListener("change", e => {
    if (!(e.target.value in system.availableLanguages)) {
        //
    }
});