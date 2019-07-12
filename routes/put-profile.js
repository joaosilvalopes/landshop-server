const postgres = require('../config/postgres');
const logger = require('../utils/logger');
const { isValidName, isValidPhone, isValidBio } = require('../utils/validation');
const { withToken } = require('../utils/authToken');

module.exports = (app) => app.put('/profile', async (req, res) => {
    const { firstName, lastName, bio, phone } = req.body;

    try {
        if (!isValidName(firstName) || !isValidName(lastName) || !isValidPhone(phone) || !isValidBio(bio)) {
            return res.status(400).send();
        }

        await postgres.query(`
            update Users
            set
                first_name = $1,
                last_name = $2,
                bio = $3,
                phone = $4
            where username = $5
        `, [firstName, lastName, bio, phone, req.user.username]);

        return res.json(withToken({
            ...req.user,
            firstName,
            lastName,
            bio,
            phone,
        }));
    } catch (error) {
        logger.log(error);
        return res.status(400).send();
    }
});
