const generateSlug = require('../generateSlug');

describe('utils/generateSlug', () => {
    it('Should correcly generate a slug from a title and an id number', () => {
        expect(generateSlug('My Listing', 23)).toBe('my-listing-23');
        expect(generateSlug(' My Listing ', 43)).toBe('my-listing-43');
    });
});
