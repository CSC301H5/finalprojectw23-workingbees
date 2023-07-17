export function validRegistration(email, password) {
    // checks username and password formatting
    // emails have to follow tstandard email formatting
    // passwords are 8-32 chars long, and alphanumeric  plus .,-_!@#%$ and spaces
    const emailexp = /^[\w.-_]+@\w+\.\w+$/
    const pwexp = /^[\w.,-_!@#%$ ]{8,32}$/

    return (emailexp.test(email) && pwexp.test(password))
}