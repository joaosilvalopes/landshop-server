create table Users (
   id             bigserial      not null,
   username       varchar(255)   not null unique,
   email          varchar(255)   not null unique,
   bio            text,
   phone_number   varchar(255),
   password       varchar(255),
   verified       boolean        not null default false,
   created_at     timestamp      not null default now(),
   updated_at     timestamp      not null default now(),

   primary key(id)
);

create table Listings (
   id             bigserial      not null,
   user_id        integer        not null references Users(id),
   slug           varchar(255)   not null unique,
   title          varchar(255)   not null,
   description    text,
   price          integer,
   currency       varchar(255),
   public_phone   varchar(255),
   public_email   varchar(255),
   created_at     timestamp      not null default now(),
   updated_at     timestamp      not null default now(),

   primary key(id)
);

create table ListingCoordinates (
   listing_id     integer        not null references Listings(id),
   lat            float          not null,
   lng            float          not null,

   primary key(listing_id, lat, lng)
);

create index on Users (username);

create index on Listings (slug);

create index on ListingCoordinates (lat);
create index on ListingCoordinates (lng);
