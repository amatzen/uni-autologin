import f1 from './f1'

export default function isBroker() {
    return (
        (
            f1.glob('https://broker.unilogin.dk/auth*', f1.tabUrl()) ||
            f1.glob('https://idp.unilogin.dk/auth*', f1.tabUrl())
        )
        &&
        (
            !f1.glob('https://idp.unilogin.dk/auth/realms/idp/login-actions/reset-credentials*', f1.tabUrl()) &&
            !f1.glob('https://broker.unilogin.dk/auth/realms/idp/login-actions/reset-credentials*', f1.tabUrl())
        )
    )
}