const SPACE_REGEX = / /g;

module.exports = (title, id) => `${title.toLowerCase().trim().replace(SPACE_REGEX, '-')}-${id}`;
