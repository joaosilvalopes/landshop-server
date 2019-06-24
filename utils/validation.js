const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NAME_REGEX = /^[a-zA-Z ]+$/;

module.exports = {
    // Validation
    isValidUsername: username => !!(username && username.length > 3 && username.length < 16),
    isValidEmail: email => EMAIL_REGEX.test(String(email).toLowerCase()),
    isValidPassword: password => !!(password && password.length > 6 && password.length < 255),
    isValidName: name => !!(name && name.length > 2 && name.length < 24 && NAME_REGEX.test(name)),
    // Curation
    curateUsername: username => username.toLowerCase().trim(),
    curateEmail: email => email.toLowerCase().trim(),
    curateName: name => name.trim(),
};
