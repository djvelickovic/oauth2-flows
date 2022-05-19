const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const authorizeButton = document.querySelector('#authorize')
const logoutButton = document.querySelector('#logout')

const {code, state} = params

const authorizationEndpoint = 'http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/auth'
const tokenEndpoint = 'http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/token'
const logoutEndpoint = 'http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/logout?redirect_uri=http://localhost:8380/'
const clientId = 'authorization-code-flow-with-pkce-demo'
const redirectUri = 'http://localhost:8380'

const base64encode = (ascii) => {
    return btoa(String.fromCharCode.apply(null, ascii))
}

const dec2hex = (dec) => {
    return dec.toString(16).padStart(2, "0")
}

const randomString = (len) => {
    const arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

authorizeButton.addEventListener('click', async (e) => {
    e.preventDefault()
    await authorize()
})

logoutButton.addEventListener('click', async (e) => {
    e.preventDefault()
    window.sessionStorage.clear()
    window.location = logoutEndpoint
})

const authorize = async () => {
    const state = randomString(20)

    const codeVerifier = randomString(100)

    const codeChallengeMethod = 'S256'
    const codeChallengeB64 = await generateCodeChallenge(codeVerifier)

    window.sessionStorage.setItem('codeVerifier', codeVerifier)
    window.sessionStorage.setItem(state, window.location.href)

    window.location = `${authorizationEndpoint}?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&state=${state}&code_challenge=${codeChallengeB64}&code_challenge_method=${codeChallengeMethod}`
}

const generateCodeChallenge = async (codeVerifier) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await window.crypto.subtle.digest("SHA-256", data)
    let base64Digest = base64encode(new Uint8Array(digest))

    const codeChallengeB64 = base64Digest
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "")

    return codeChallengeB64
}

const getToken = async () => {
    const codeVerifier = window.sessionStorage.getItem('codeVerifier')

    const details = {
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'code_verifier': codeVerifier,
        'code': code,
        'redirect_uri': redirectUri
    }

    const request = Object.entries(details).map(([key, value]) => `${key}=${value}`).join('&')

    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        body: request,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;  charset=UTF-8'
        },
    })

    return response.json()
}

const hasTokenExpired = () => {
    const expiresAt = Number(window.sessionStorage.getItem('expiresAt'))
    return expiresAt - 10 * 1000 < Date.now()
}

const storeNewToken = (accessToken, expiresIn) => {
    const expiresAt = Date.now() + expiresIn * 1000
    window.sessionStorage.setItem('accessToken', accessToken)
    window.sessionStorage.setItem('expiresAt', expiresAt + '')
}

const removeCodeAndState = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('code')
    params.delete('session_state')
    params.delete('state')
    const paramsString = params.toString()
    window.history.pushState("page without code", "Title", window.location.pathname + (paramsString ? '?' + paramsString : ''));
}

const startTokenExpirationChecker = () => {
    const handle = setInterval(async () => {
        if (hasTokenExpired()) {
            console.log('Token has expired')
            await authorize()
            clearInterval(handle)
        }
        console.log('Checking access token')
    }, 1000)
}

if (code && state) {
    getToken().then(tokens => {
        const { access_token: accessToken, expires_in: expiresIn } = tokens
        console.log(`Token expires in ${expiresIn}`)
        storeNewToken(accessToken, expiresIn)
        removeCodeAndState()
        startTokenExpirationChecker()
        console.log(`Should redirect to the: ${window.sessionStorage.getItem(state)}`)
    })
} else {
    if (hasTokenExpired()) {
        authorize()
            .catch(err => console.error(err))
    } else {
        startTokenExpirationChecker()
    }
}







