function nextSuffix(current) {
    const digits = current.split('');

    let i;
    for (i = digits.length - 1; i >= 0; i -= 1) {
        if (digits[i] < 9) {
            digits[i] = +digits[i] + 1;

            break;
        }
        digits[i] = 0;
    }

    if (i === -1) {
        digits.unshift(0);
    }

    return digits.join('');
}

/**
 * Generates suggested usernames from a given username and max length
 *
 * e.g.:
 *   [...suggestedUsernames({ username: 'us', maxLength: 4 })]
 * > [
 *      'us',
 *      'us0' , ..., 'us9' ,
 *      'us00', ..., 'us99', // reached max length, trim down given username one character
 *      'u',
 *      'u0'  , ..., 'u9'  ,
 *      'u00' , ..., 'u99' ,
 *      'u000', ..., 'u999'  // reached max length and can't trim down given username anymore, end
 *   ]
 */
function* suggestedUsernames({ username, maxLength }) {
    let suffix = '0';
    let suggestion = username;

    while (suggestion.length <= maxLength) {
        yield suggestion;

        suffix = nextSuffix(suffix);
        suggestion = username + suffix;
    }

    if (username.length > 1) {
        yield* suggestedUsernames({ username: username.slice(0, -1), maxLength });
    }
}

module.exports = suggestedUsernames;
