const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    // Validation
    isValidUsername: username => !!(username && username.length > 3 && username.length < 16),
    isValidEmail: email => EMAIL_REGEX.test(String(email).toLowerCase()),
    isValidPassword: password => !!(password && password.length > 6 && password.length < 255),
    isValidName: name => !!(name && name.length > 1 && name.length < 24),
    isValidListingTitle: title => !!(title && title.length > 2 && !title.includes('-')),
    isValidPhone: phone => !!(phone && phone.length > 3 && phone.length < 30),
    isValidBio: bio => !!(bio && bio.length < 255),
    // Curation
    curateUsername: username => username.toLowerCase().trim(),
    curateEmail: email => email.toLowerCase().trim(),
    curateName: name => name.trim(),
};
