INSERT INTO public.places (id, name, latitude, longitude, osm_id)
VALUES 
  (1, 'Cambridge Bay', 69.1169, -105.0593, NULL),
  (2, 'Université du Québec à Chicoutimi', 48.4197, -71.0538, NULL),
  (3, 'Université Laval', 46.7817, -71.2747, NULL),
  (4, 'Ottawa Shaw Centre', 45.4242529, -75.6912376, '264535169'),
  (5, 'Permafrost impact on Aquatic Systems', 69.2342410666946, -105.99041660227468, NULL),
  (6, 'Kitigaq Area Permafrost Degradation', 69.2319, -105.9444, NULL),
  (7, 'Campus Lavallée', 45.466043, -75.754984, '477197015');

-- Reset sequence after inserting
SELECT setval('places_id_seq', (SELECT MAX(id) FROM places), true);
