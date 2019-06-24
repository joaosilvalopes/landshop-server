create table users (
   id       bigserial    not null PRIMARY KEY,
   username varchar(255) not null unique,
   email    varchar(255) not null unique,
   password varchar(255),
   verified boolean      not null default false
);
