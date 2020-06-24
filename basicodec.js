const usernameInput = document.getElementById('encode-username');
const passwordInput = document.getElementById('encode-password');
const encodeResultElt = document.getElementById('encode-result');

const authHeaderInput = document.getElementById('decode-auth-header');
const decodedUsernameElt = document.getElementById('decoded-username');
const decodedPasswordElt = document.getElementById('decoded-password');

[usernameInput, passwordInput].forEach(inputElt => inputElt.addEventListener('input', encode));
authHeaderInput.addEventListener('input', decode);

function encode() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    let headerValue = '';

    if (username || password) {
        headerValue = `Authorization: Basic ${btoa(`${username}:${password}`)}`;
    }

    encodeResultElt.textContent = headerValue;

    if (authHeaderInput.value !== headerValue) {
        authHeaderInput.value = headerValue;
        authHeaderInput.dispatchEvent(new Event('input'));
    }
}

const authHeaderRegex = /(?:Authorization: *)?(?:Basic +)?(\b[A-Za-z0-9+/=]+\b)/i;
function decode() {
    const authHeader = authHeaderInput.value;
    const matches = authHeaderRegex.exec(authHeader);

    let username = '';
    let password = '';

    if (matches) {
        try {
            const parts = atob(matches[1]).split(':', 2);

            username = parts[0];
            password = parts[1];
        } catch (error) {
            // ok nevermind
        }
    }

    decodedUsernameElt.textContent = username;
    decodedPasswordElt.textContent = password;

    if (usernameInput.value !== username) {
        usernameInput.value = username;
        usernameInput.dispatchEvent(new Event('input'));
    }

    if (passwordInput.value !== password) {
        passwordInput.value = password;
        passwordInput.dispatchEvent(new Event('input'));
    }
}
