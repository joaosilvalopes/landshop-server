const get = require('lodash/get');
const logger = require('../utils/logger');

module.exports = (app, connection) => app.get('/user/:username', async (req, res) => {
    try {
        const result = await connection.query(`
            select
                u.username,
                u.email,
                u.bio,
                l.slug
            from Listings l, Users u
            where l.user_id = u.id
            and u.username = $1
        `, [req.params.username]);

        const parsed = result.rows.reduce((acc, item) => {
            const { slug, ...newItem } = item;
            const listings = get(acc, `${item.username}.listings`) || [];

            newItem.listings = [...listings, slug];

            return {
                ...acc,
                [item.username]: newItem,
            };
        }, {});

        res.json(parsed);
    } catch (error) {
        logger.log(error);
        res.status(400).json();
    }
});
