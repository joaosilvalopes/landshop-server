const logger = require('../utils/logger');
const generateSlug = require('../utils/generateSlug');
const { isValidListingTitle } = require('../utils/validation');
const postgres = require('../config/postgres');

module.exports = (app) => app.put('/listing/:slug', async (req, res) => {
    const { title, description, price, currency, phone, email, coordinates } = req.body;
    const { username } = req.user;

    if (!isValidListingTitle(title)) {
        return res.status(400).send();
    }

    try {
        await postgres.query('begin');

        const result = await postgres.query(`
            select id from Listings
                where slug = $1 and
                user_id = (select id from Users where username = $2)`, [
                    req.params.slug,
                    username,
                ]);

        const { id } = result.rows[0];
        const slug = generateSlug(title, id);

        if (result.rows.length < 1) {
            return res.status(403).send();
        }

        await postgres.query(`
            update Listings
            set
                title=$1,
                description=$2,
                price=$3,
                currency=$4,
                phone=$5,
                email=$6,
                slug=$7
            where
                id = $8
        `, [
            title,
            description,
            price,
            currency,
            phone,
            email,
            slug,
            id,
        ]);

        await postgres.query('delete from ListingCoordinates where listing_id = $1', [id]);

        await postgres.query(`
            insert into ListingCoordinates(listing_id, lat, lng) values
            ${coordinates.map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)}
        `, coordinates.flatMap(({ lat, lng }) => [id, lat, lng]));

        await postgres.query('commit');

        return res.send({ title, description, price, currency, phone, email, username, coordinates, slug });
    } catch (error) {
        await postgres.query('rollback');
        logger.log(error);
        return res.status(400).send();
    }
});
