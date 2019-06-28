const get = require('lodash/get');
const logger = require('../utils/logger');

module.exports = (app, connection) => app.get('/listing/:slug', async (req, res) => {
    try {
        const result = await connection.query(`
            select
                l.slug,
                l.title,
                l.description,
                l.price,
                l.currency,
                l.public_phone,
                l.public_email,
                u.username,
                lc.lat,
                lc.lng
            from Listings l, Users u, ListingCoordinates lc
            where l.user_id = u.id
            and l.id = lc.listing_id
            and l.slug = $1
        `, [req.params.slug]);

        const parsed = result.rows.reduce((acc, item) => {
            const { lat, lng, ...newItem } = item;
            const coordinates = get(acc, 'coordinates') || [];

            return {
                ...newItem,
                coordinates: [...coordinates, { lat, lng }],
            };
        }, {});

        res.json(parsed);
    } catch (error) {
        logger.log(error);
        res.status(400).json({ error });
    }
});
