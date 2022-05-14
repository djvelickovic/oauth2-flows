const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

console.log(`code: ${params.code}`)
console.log(`session_state: ${params.session_state}`)
console.log(`state: ${params.state}`)

const {code, session_state, state} = params

const authorize = async () => {
    const state = uuidv4()
    const codeVerifier = uuidv4()

    const codeChallengeMethod = 'S256'

    window.localStorage.setItem('codeVerifier', codeVerifier)

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    console.log(digest)

    let base64Digest = base64encode(new Uint8Array(digest))

    console.log(base64Digest)
    // you can extract this replacing code to a function
    const codeChallengeB64 = base64Digest
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

    console.log(codeChallengeB64)

    window.location = `http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/auth?response_type=code&redirect_uri=http://localhost:8380&client_id=authorization-code-flow-with-pkce-demo&state=${state}&code_challenge=${codeChallengeB64}&code_challenge_method=${codeChallengeMethod}`
}


const base64encode = (ascii) => {
    return btoa(String.fromCharCode.apply(null, ascii));
}

const getToken = async () => {
    const codeVerifier = window.localStorage.getItem('codeVerifier')
    console.log(`code verifier: ${codeVerifier}`)
    const details = {
        'response_type': 'authorization_code',
        'client_id': 'authorization-code-flow-with-pkce-demo',
        'code_verifier': codeVerifier,
        'code': code,
        'redirect_uri': 'http://localhost:8380'
    };

    const formBody = [];
    for (const property in details) {
        // const encodedKey = encodeURIComponent(property);
        // const encodedValue = encodeURIComponent(details[property]);
        // formBody.push(encodedKey + "=" + encodedValue);
        formBody.push(property + "=" + details[property]);
    }
    const request = formBody.join("&");

    const url = `http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/token`
    const response = await fetch(url, {
        method: 'POST',
        body: request,
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    return response.json()
}

const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

// const sha256 = (string) => {
//     const utf8 = new TextEncoder().encode(string);
//     return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         // const hashHex = hashArray
//         //     .map((bytes) => bytes.toString(16).padStart(2, '0'))
//         //     .join('');
//         // return hashHex;
//         return hashArray;
//     });
// }

if (code && session_state && state) {
    getToken().then(response => console.log(`Tokens: ${response}`)).catch(err => console.error(err))
}