CREATE TABLE users_table (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL UNIQUE,
  last_name TEXT NOT NULL,
  email TEXT,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

/*
ALTER TABLE thingful_things
  ADD COLUMN
    user_id INTEGER REFERENCES thingful_users(id)
    ON DELETE SET NULL;

*/