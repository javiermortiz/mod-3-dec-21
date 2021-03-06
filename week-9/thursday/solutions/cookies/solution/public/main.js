/* ================================ PHASE 1 ================================ */
//!!START SILENT
// For getting value of just one cookie
function getCookieValue(cookieName) {
    const allCookies = document.cookie;
    let cookieValue = '';

    // split up cookie to find just the part that's needed
    const matchingCookie = allCookies
        .split('; ')
        .find(c => c.startsWith(`${cookieName}=`));

    // the value is just the part after the equal sign
    if (matchingCookie) {
        cookieValue = matchingCookie.split('=')[1];
    }

    return cookieValue;
}
//!!END

// For storing user's theme selection in the browser

function storeTheme(themeName) {
    //!!START
    // Phase 1
    // console.log(themeName);
    // document.cookie = `theme=${themeName}`;
    // Phase 2
    document.cookie = `theme=${themeName}`;
    //!!END
}

// For restoring theme, if selected by the user in the past

function restoreTheme() {
    //!!START
    const storedTheme = getCookieValue('theme');
    // const storedTheme = document.cookie.split('=')[1];
    if (storedTheme) {
        setTheme(storedTheme);
    }
    //!!END
}

// For clearing theme selection from the browser's storage (reset to default)

function clearTheme() {
    //!!START
    document.cookie = 'theme=; max-age=0';
    //!!END
}

/* ================================ PHASE 2 ================================ */

// For storing user's display name
function storeName(displayName) {
    //!!START
    document.cookie = `displayName=${displayName}`;
    //!!END
}

// For restoring user's display name, if set in the past
function restoreName() {
    //!!START
    const storedName = getCookieValue('displayName')
    if (storedName) {
        setInputValue('display-name', storedName);
    }
    //!!END
}

// For clearing user's display name from browser storage
function clearName() {
    //!!START
    document.cookie = `displayName=; max-age=0`;
    //!!END
}

/* ========================================================================= */
/* ====================== DO NOT EDIT BELOW THIS LINE ====================== */
/* ========================================================================= */

// ===== HELPER FUNCTIONS

// For changing one theme button's styling to indicate which theme is selected

function toggleButtonSelection(themeName, selected) {
    const btn = document.getElementById(`theme-button-${themeName}`);
    if (btn) {
        if (selected) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    }
}

// For assigning change event to input field

function assignChangeEvent(field, handleChange) {
    const input = document.getElementById(`input-${field}`);
    if (input) {
        input.addEventListener('change', (event) => {
            handleChange(event.target.value);
        });
    }
}

// For setting value on input field

function setInputValue(field, value) {
    const input = document.getElementById(`input-${field}`);
    if (input) {
        input.value = value;
    }
}

// ===== THEME CONTROL

// Use a particular theme

function setTheme(themeName) {
    // Clear previous selection so buttons don't get stuck in selected state
    resetTheme()

    // Remember user's selection by storing it in their browser
    storeTheme(themeName);

    // Apply the theme to the page document
    document.documentElement.className = `theme-${themeName}`;

    // Show which button is selected
    toggleButtonSelection(themeName, true);
}

// Use default theme

function resetTheme() {
    // Remove selection styling from all buttons
    toggleButtonSelection('dragon', false);
    toggleButtonSelection('griffin', false);
    toggleButtonSelection('wizard', false);

    // Set default theme so header and footer are contrast colors
    document.documentElement.className = `theme-none`;
}

// ===== NAME CONTROL

// For resetting the display name to empty string

function resetName() {
    setInputValue('display-name', '');
}

// For the clear/reset button

function clearAll() {
    // Remove from browser storage
    clearTheme();
    clearName();

    // Reset the page
    resetTheme();
    resetName();
}

// For setting a theme when the page loads (called by body's onload event)

function initializePage() {
    // Set default theme so header & footer have dark backgrounds
    resetTheme();

    // Restore user's previous theme selection, if it exists
    restoreTheme();

    // Assign event to name input
    assignChangeEvent('display-name', storeName);

    // Restore user's previous name selection, if it exists
    restoreName();
}
