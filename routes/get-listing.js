const get = require('lodash/get');
const postgres = require('../config/postgres');
const logger = require('../utils/logger');

module.exports = (app) => app.get('/listing/:slug', async (req, res) => {
    try {
        const result = await postgres.query(`
            select
                l.slug,
                l.title,
                l.description,
                l.price,
                l.currency,
                l.phone,
                l.email,
                u.username,
                lc.lat,
                lc.lng
            from Listings l, Users u, ListingCoordinates lc
            where l.user_id = u.id
            and l.id = lc.listing_id
            and l.slug = $1
        `, [req.params.slug]);

        if (result.rows.length < 1) {
            return res.status(404).send();
        }

        const parsed = result.rows.reduce((acc, item) => {
            const { lat, lng, ...newItem } = item;
            const coordinates = get(acc, 'coordinates') || [];

            return {
                ...newItem,
                coordinates: [...coordinates, { lat, lng }],
            };
        }, {});

        return res.json(parsed);
    } catch (error) {
        logger.log(error);
        return res.status(400).json({ error });
    }
});
