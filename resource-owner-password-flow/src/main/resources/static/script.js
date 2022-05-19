const loginFormElement = document.querySelector('#login-form')
const loginBlock = document.querySelector('#login-block')
const mainBlock = document.querySelector('#main-block')

const logoutButton = document.querySelector('#logout')

const showLoginPage = () => {
    loginBlock.style.display = 'block'
    mainBlock.style.display = 'none'
}

const showMainPage = () => {
    loginBlock.style.display = 'none'
    mainBlock.style.display = 'block'
}

logoutButton.addEventListener('click', (e) => {
    e.preventDefault()
    window.sessionStorage.clear()
    showLoginPage()
})

loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(e)
    const formData = new FormData(loginFormElement);
    const username = formData.get('username')
    const password = formData.get('password')
    const tokens = await authorize(username, password)
    const { access_token: accessToken, expires_in: expiresIn } = tokens
    window.sessionStorage.setItem('accessToken', accessToken)
    window.sessionStorage.setItem('expiresAt', (Date.now() + (+expiresIn) * 1000) + '')

    loginFormElement.reset()

    showMainPage()
})

const authorize = async (username, password) => {
    const request = {
        grant_type: 'password',
        client_id: 'resource-owner-password-flow-demo',
        username: username,
        password: password
    }

    const body = Object.entries(request).map(([key, value]) => `${key}=${value}`).join('&')

    const response = await fetch('http://localhost:8180/realms/OAuth2FlowsTest/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })

    return response.json()
}

const hasTokenExpired = () => {
    const expiresAt = +window.sessionStorage.getItem('expiresAt')
    return expiresAt ?? expiresAt < Date.now()
}

if (hasTokenExpired()) {
    showLoginPage();
} else {
    showMainPage();
}




