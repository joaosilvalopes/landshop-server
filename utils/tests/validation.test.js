const {
    isValidUsername,
    isValidEmail,
    isValidPassword,
    isValidName,
    curateUsername,
    curateEmail,
    curateName,
} = require('../validation');

describe('utils/validation', () => {
    it('Should correcly validate a username', () => {
        expect(isValidUsername(null)).toBe(false);
        expect(isValidUsername(undefined)).toBe(false);
        expect(isValidUsername([])).toBe(false);
        expect(isValidUsername({})).toBe(false);
        expect(isValidUsername('b')).toBe(false);
        expect(isValidUsername('bad')).toBe(false);
        expect(isValidUsername('123456789012345678901234isTooLong')).toBe(false);
        expect(isValidUsername('good')).toBe(true);
        expect(isValidUsername('verygood')).toBe(true);
        expect(isValidUsername('VeryGood')).toBe(true);
    });

    it('Should correcly validate an email', () => {
        expect(isValidEmail(null)).toBe(false);
        expect(isValidEmail(undefined)).toBe(false);
        expect(isValidEmail([])).toBe(false);
        expect(isValidEmail({})).toBe(false);
        expect(isValidEmail('bademail')).toBe(false);
        expect(isValidEmail('bademail@')).toBe(false);
        expect(isValidEmail('bademail@.com')).toBe(false);
        expect(isValidEmail('bademail@example')).toBe(false);
        expect(isValidEmail('bad email@example.com')).toBe(false);
        expect(isValidEmail('goodemail@example.com')).toBe(true);
        expect(isValidEmail('GoodEmail@Example.com')).toBe(true);
    });

    it('Should correcly validate a password', () => {
        expect(isValidPassword(null)).toBe(false);
        expect(isValidPassword(undefined)).toBe(false);
        expect(isValidPassword([])).toBe(false);
        expect(isValidPassword({})).toBe(false);
        expect(isValidPassword('short')).toBe(false);
        expect(isValidPassword('tooLongPassword'.repeat(500))).toBe(false);
    });

    it('Should correcly validate a name', () => {
        expect(isValidName(null)).toBe(false);
        expect(isValidName(undefined)).toBe(false);
        expect(isValidName([])).toBe(false);
        expect(isValidName({})).toBe(false);
        expect(isValidName('Bad With Numbers 123')).toBe(false);
        expect(isValidName('Bad With Symbols _%&')).toBe(false);
        expect(isValidName('Bad With Emoji 💩')).toBe(false);
        expect(isValidName('tooLongName'.repeat(500))).toBe(false);
        expect(isValidName('Good Name')).toBe(true);
    });

    it('Should correcly curate a username', () => {
        expect(curateUsername('johndoe ')).toBe('johndoe');
        expect(curateUsername('JohnDoe')).toBe('johndoe');
        expect(curateUsername(' JOHNdoe')).toBe('johndoe');
    });

    it('Should correcly curate an email', () => {
        expect(curateEmail('someone@example.com ')).toBe('someone@example.com');
        expect(curateEmail('SOMEONE@example.com')).toBe('someone@example.com');
        expect(curateEmail(' someone@eXample.com')).toBe('someone@example.com');
    });

    it('Should correcly curate a name', () => {
        expect(curateName('Quentin Tarantino ')).toBe('Quentin Tarantino');
        expect(curateName(' Quentin Tarantino')).toBe('Quentin Tarantino');
        expect(curateName(' Quentin Tarantino ')).toBe('Quentin Tarantino');
    });
});
