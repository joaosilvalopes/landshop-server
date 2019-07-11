const multer = require('multer');

const parseMultipart = multer();

const withErrorHandler = (middlewareCreator) => (...params) => [
    middlewareCreator(...params),
    (err, req, res, _) => res.status(400).send(),
];

module.exports = [
    'single',
    'array',
    'fields',
].reduce((acc, c) => ({
    ...acc,
    [c]: withErrorHandler(parseMultipart[c].bind(parseMultipart)),
}), {});
