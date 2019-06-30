const SPACE_REGEX = / /g;

module.exports = (title, id) => `${title.toLowerCase().replace(SPACE_REGEX, '-')}-${id}`;
