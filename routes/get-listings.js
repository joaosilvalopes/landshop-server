const get = require('lodash/get');

module.exports = (app, connection) => app.get('/listings', async (req, res) => {
    try {
        const result = await connection.query(`
            SELECT
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
            FROM Listings l, Users u, ListingCoordinates lc
            WHERE l.user_id = u.id
            AND l.id = lc.listing_id
        `);

        const parsed = result.rows.reduce((acc, item) => {
            const { lat, lng, ...newItem } = item;
            const coordinates = get(acc, `${item.slug}.coordinates`) || [];

            newItem.coordinates = [...coordinates, { lat, lng }];

            return {
                ...acc,
                [item.slug]: {
                    ...acc[item.slug],
                    ...newItem,
                },
            };
        }, {});

        res.json(parsed);
    } catch (error) {
        res.status(400).json({ error });
    }
});
