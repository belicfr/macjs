const NEXT_SECTION_BUTTONS
    = document.querySelectorAll("button[button-action='nextSection']");
const PREVIOUS_SECTION_BUTTONS
    = document.querySelectorAll("button[button-action='previousSection']");
const SECTIONS = [
    "intro", "installer_os",
];

let currentSectionIndex = 0,
    currentSection,
    otherSections;

function nextSection() {
    currentSectionIndex++;

    updateSectionVariables();

    switchSection();
}

function previousSection() {
    currentSectionIndex--;

    updateSectionVariables();

    switchSection();
}

function updateSectionVariables() {
    currentSection = document
        .querySelector(`section#${SECTIONS[currentSectionIndex]}`);

    otherSections = document
        .querySelectorAll(`section:not(#${SECTIONS[currentSectionIndex]})`);
}

function switchSection() {
    otherSections.forEach(section => {
        section.classList.add("hidden");
    });

    currentSection.classList.remove("hidden");
}

NEXT_SECTION_BUTTONS.forEach(button => {
    button.addEventListener("click", nextSection);
});

PREVIOUS_SECTION_BUTTONS.forEach(button => {
    button.addEventListener("click", previousSection);
});