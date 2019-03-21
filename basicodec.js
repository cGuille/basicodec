const usernameInput = document.getElementById('encode-username');
const passwordInput = document.getElementById('encode-password');
const encodeResultElt = document.getElementById('encode-result');

function encode() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    encodeResultElt.textContent = btoa(`${username}:${password}`);
}

[usernameInput, passwordInput].forEach(inputElt => inputElt.addEventListener('keyup', encode));

const authHeaderInput = document.getElementById('decode-auth-header');
const decodedUsernameElt = document.getElementById('decoded-username');
const decodedPasswordElt = document.getElementById('decoded-password');

const authHeaderRegex = /(?:Authorization: *)?(?:Basic +)?(.*)/i;

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

authHeaderInput.addEventListener('keyup', decode);
