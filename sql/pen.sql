DROP TABLE if exists links;
DROP TABLE if exists comments;

CREATE TABLE links (
    id SERIAL primary key,
    timestamp TIMESTAMP default current_timestamp,
    url VARCHAR(255),
    sometext TEXT
);

INSERT INTO links (url, sometext) VALUES ('http://www.faz.net/', 'Frankfurter Allgemeine');
INSERT INTO links (url, sometext) VALUES ('https://zenhabits.net/about/', 'Zen habits');
INSERT INTO links (url, sometext) VALUES ('https://chomsky.info/', 'Noam Chomsky');
INSERT INTO links (url, sometext) VALUES ('http://www.bbc.com/', 'BBC WORLD NEWS');
INSERT INTO links (url, sometext) VALUES ('https://www.pluralsight.com/', 'PLURALSIGHT is the best learning platform');
INSERT INTO links (url, sometext) VALUES ('https://www.lynda.com/', 'Why not Lynda?');

-- psql penultimate
--
-- psql penultimate -f sql/pen.sql
--
-- \dt - tables
-- \du - users

CREATE TABLE comments(
    id SERIAL primary key,
    linksid INTEGER,
    timestamp TIMESTAMP default current_timestamp,
    parentid INTEGER,
    comment TEXT
);
