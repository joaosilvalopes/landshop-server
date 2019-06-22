
module.exports = (app) => app.get('/hello-world', (req, res) => {
    res.json({
        message: 'Hello World!',
    });
});
