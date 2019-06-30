const logger = require('../utils/logger');
const generateSlug = require('../utils/generateSlug');
const { isValidListingTitle } = require('../utils/validation');

module.exports = (app, connection) => app.post('/listing', async (req, res) => {
    const { title, description, price, currency, phone, email, username, coordinates } = req.body;

    if (!isValidListingTitle(title)) {
        return res.status(400).send();
    }

    try {
        const { rows: [{ nextval: id }] } = await connection.query('select nextval(\'listings_id_seq\')');
        const slug = generateSlug(title, id);

        await connection.query('begin');

        await connection.query(`
            insert into Listings(id, title, slug, description, price, currency, phone, email, user_id)
            values($1, $2, $3, $4, $5, $6, $7, $8, (select id from Users where username = $9))
        `, [id, title, slug, description, price, currency, phone, email, username]);

        await connection.query(`
            insert into ListingCoordinates(listing_id, lat, lng) values
            ${coordinates.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)}
        `, coordinates.reduce((acc, c) => {
            acc.push(id, c.lat, c.lng);

            return acc;
        }, []));

        await connection.query('commit');

        return res.send({ title, description, price, currency, phone, email, username, coordinates, slug });
    } catch (error) {
        await connection.query('rollback');
        logger.log(error);
        return res.status(400).send();
    }
});
