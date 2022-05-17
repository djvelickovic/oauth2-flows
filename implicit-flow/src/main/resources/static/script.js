const params = new URLSearchParams(window.location.hash)

const accessToken = params.get('access_token')
const expiresIn = Number(params.get('expires_in'))

const logoutButton = document.querySelector('#logout')

const hasTokenExpired = () => Date.now() > +window.localStorage.getItem('expiresAt')

const authorize = () => {
    window.location = 'http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/auth?response_type=token&client_id=implicit-flow-demo&redirect_uri=http://localhost:8580'
}

const removeSensitiveParams = () => {
    window.location.hash = ''
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

logoutButton.addEventListener('click', async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    window.location = 'http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/logout?redirect_uri=http://localhost:8580/'
})


if (accessToken && expiresIn) {
    const expiresAt = Date.now() + expiresIn * 1000;
    window.localStorage.setItem('accessToken', accessToken)
    window.localStorage.setItem('expiresAt', expiresAt + '')

    removeSensitiveParams()
    startTokenExpirationChecker()
} else {
    authorize()
}
