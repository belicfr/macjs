const DEVICE_NAME = document.querySelector("input#device_name");
const LANGUAGE = document.querySelector("select#language");
const PRODUCT = document.querySelector("select#product");
const SUBMIT_BUTTON = document.querySelector("section#installer_os button[button-action='nextSection']");

const INSTALLATION_STEPS_TO_VERIFY = [
    "os_installer",
];

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

    // Verify form values validity
    INSTALLATION_STEPS_TO_VERIFY.forEach(step => updateFormValidity(step));
});

function isFormValid() {
    return DEVICE_NAME.value.length
        && syntaxPrecepts.validate(DEVICE_NAME.value, syntaxPrecepts.deviceName)
        && LANGUAGE.value in system.availableLanguages
        && PRODUCT.value in system.availableProducts;
}