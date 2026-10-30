-- Only our own tables are dropped here. Auth tables are added in a later stage.
DROP TABLE IF EXISTS classes, trainers, plans, journeys CASCADE;

CREATE TABLE journeys (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  tag_class TEXT NOT NULL,
  position INTEGER NOT NULL
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  day TEXT NOT NULL,
  start_time TEXT NOT NULL,
  name TEXT NOT NULL,
  journey_id TEXT NOT NULL REFERENCES journeys(id)
);

CREATE TABLE trainers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT NOT NULL,
  journey_id TEXT NOT NULL REFERENCES journeys(id)
);

CREATE TABLE plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  tagline TEXT NOT NULL,
  features TEXT[] NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE
);
