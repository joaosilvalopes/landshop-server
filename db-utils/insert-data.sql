insert into Users(id, username, email, password, verified) values
(1, 'admin', 'admin@example.com', 'password123', true),
(2, 'unverified', 'unverified@example.com', 'password123', false);

insert into Listings(id, user_id, slug, title, description, price, currency, public_phone, public_email) values
(1, 1, 'bermuda-triangle', 'Bermuda Triangle', 'Description goes here.', 48000, 'EUR', '+351 912 345 678', 'bermudatriangle@example.com'),
(2, 1, 'listing-a', 'Listing A', 'Description goes here.', 92000, 'EUR', '+351 912 345 678', 'listing-a@example.com'),
(3, 1, 'listing-b', 'Listing B', 'Description goes here.', 20000, 'EUR', '+351 912 345 678', 'listing-b@example.com'),
(4, 1, 'listing-c', 'Listing C', 'Description goes here.', 32000, 'EUR', '+351 912 345 678', 'listing-c@example.com');

insert into ListingCoordinates(listing_id, lat, lng) values
(1, 25.774, -80.190),
(1, 18.466, -66.118),
(1, 32.321, -64.757),
(2, 41.166824, -8.663053),
(2, 41.166443, -8.664104),
(2, 41.166925, -8.664399),
(2, 41.167111, -8.663842),
(2, 41.167721, -8.664260),
(2, 41.167959, -8.663772),
(2, 41.167361, -8.663311),
(2, 41.166832, -8.663064),
(3, 41.170764, -8.664812),
(3, 41.170806, -8.665343),
(3, 41.170253, -8.665392),
(3, 41.170180, -8.664839),
(4, 41.160764, -8.664812),
(4, 41.160806, -8.665343),
(4, 41.160253, -8.665392),
(4, 41.160180, -8.664839);
