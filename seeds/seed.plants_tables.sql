BEGIN;

TRUNCATE
  /*thingful_reviews,*/
  /*thingful_things,*/
  plants_table
  /*users_table*/
  RESTART IDENTITY CASCADE;
  
INSERT INTO plants_table (plant_name, water_day, water_week, rec_env, fert_type, when_repot, maint_level,fun_fact, fav)
VALUES
    ('plant 1 name', 0, 2, 'indoors', 'soil1', 'every other month', 'low','does not need a lot of water', true),
    ('plant 2 name', 1, 4, 'indoors', 'fert2', 'every month', 'low', 'Bought 2day', true),
    ('plant 3 name', 1, 2, 'outdoors', 'soil3', 'every other week', 'medium', 'Bought for $3', false),
    ('plant 4 name', 1, 5, 'outdoors', 'fert4', 'every other day', 'high', '4th plant ever', false),
    ('plant 5 name', 0, 3, 'indoors', 'soil5', 'every year', 'low', 'does not need a lot of water', true);
/*
INSERT INTO users_table (first_name, last_name, email, password)
VALUES
  ('Connor', 'Wong', 'cwong93@gmail.com', '$2a$10$p/3hIe.WYz2J8KP97MDlIOuhNK5Ax4o2xzbwA9AUXml0/V1lwPiIS'),
  ('Ellen', 'Fung', 'efung93@yahoo.com', '$2a$10$ngqbHmJqhElwZAY4drL6ye1.K3I50aztwCi6lb0lmSHvDBX.XGFDa'),
  ('Luke', 'Chiang', 'lchiang@mit.edu', '$2a$10$9kv5lCsMGIbVf96an62DnuuixkgsO0iwoPd8L0bPsi1zClxBR51Ba'),
  ('Holly', 'Lee', 'hlee@buzz.net', '$2a$10$uqbEP3P5i3g.QrlEsgvlwuWi.Z0rIInrPTzzHhggOIwsy1/jrbYM.'),
  ('Jake', 'Bergara', 'jberg@ucla.edu', '$2a$10$O/KVWjeM4DdAdCrb2U.lDOb2R7fJnOAUtQmxLlwV/nXrKrYd3JLXq');
*/
COMMIT;