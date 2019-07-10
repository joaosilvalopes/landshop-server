const jwt = require('jsonwebtoken');

const parseMultipart = require('../middlewares/parseMultipart');
const uploadService = require('../services/uploadService');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');


module.exports = (app) => app.put('/profile-picture', parseMultipart.single('profilePicture'), async (req, res) => {
    try {
        const { secure_url: url } = await uploadService.upload(req.file);

        await postgres.query(`
            update Users
            set profile_picture = $1
            where username = $2
        `, [url, req.user.email]);

        const user = {
            ...req.user,
            profilePicture: url,
        };

        const token = jwt.sign(user, process.env.JWT_SECRET);

        return res.json({ ...user, token });
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
