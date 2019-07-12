const parseMultipart = require('../middlewares/parseMultipart');
const uploadService = require('../services/uploadService');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { withToken } = require('../utils/authToken');

module.exports = (app) => app.put('/profile-picture', parseMultipart.single('profilePicture'), async (req, res) => {
    try {
        const { secure_url: url } = await uploadService.upload(req.file);

        await postgres.query(`
            update Users
            set profile_picture = $1
            where username = $2
        `, [url, req.user.email]);

        const user = withToken({
            ...req.user,
            profilePicture: url,
        });

        return res.json(user);
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
