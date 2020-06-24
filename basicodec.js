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

    encodeResultElt.textContent = btoa(`${username}:${password}`);
}

const authHeaderRegex = /(?:Authorization: *)?(?:Basic +)?(\b[A-Za-z0-9+/=]+\b)/i;
function decode() {
    const authHeader = authHeaderInput.value;
    const matches = authHeaderRegex.exec(authHeader);

    if (!matches) {
        decodedUsernameElt.textContent = '';
        decodedPasswordElt.textContent = '';

        return;
    }

    try {
        const parts = atob(matches[1]).split(':', 2);

        decodedUsernameElt.textContent = parts[0];
        decodedPasswordElt.textContent = parts[1];
    } catch (error) {
        decodedUsernameElt.textContent = '';
        decodedPasswordElt.textContent = '';

        return;
    }
}
