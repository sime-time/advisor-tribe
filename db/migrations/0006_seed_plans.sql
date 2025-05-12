-- PLANS
INSERT INTO plan (advisor_id, title, description)
VALUES (1, 'Starter Mentorship', '1-on-1 business coaching to help you build a strong foundation.');

INSERT INTO plan (advisor_id, title, description)
VALUES (2, 'Growth Mentorship', 'Designed for entrepreneurs looking to scale and optimize operations.');

INSERT INTO plan (advisor_id, title, description)
VALUES (3, 'Pro Coaching Plan', 'For established founders seeking personalized strategic guidance.');

INSERT INTO plan (advisor_id, title, description)
VALUES (4, 'Elite Coaching Access', 'High-touch mentorship for serious founders and execs.');

INSERT INTO plan (advisor_id, title, description)
VALUES (5, 'Custom Strategy Plan', 'Tailored coaching and consulting for unique business challenges.');

-- PRICING
-- Amount follows Stripe's formatting where the price amount is number of pennies (lowest monetary unit)

-- Plan 1
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (1, 'month', 19900);
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (1, 'year', 199000);

-- Plan 2
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (2, 'month', 29900);
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (2, 'year', 299000);

-- Plan 3
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (3, 'month', 39900);
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (3, 'year', 399000);

-- Plan 4
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (4, 'month', 59900);
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (4, 'year', 599000);

-- Plan 5
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (5, 'month', 49900);
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES (5, 'year', 499000);

-- FEATURES
-- Plan 1
INSERT INTO plan_feature (plan_id, text) VALUES (1, '2 video calls per month');
INSERT INTO plan_feature (plan_id, text) VALUES (1, 'Weekly goal tracking');
INSERT INTO plan_feature (plan_id, text) VALUES (1, 'Email check-ins');

-- Plan 2
INSERT INTO plan_feature (plan_id, text) VALUES (2, '4 video calls per month');
INSERT INTO plan_feature (plan_id, text) VALUES (2, 'Unlimited text messaging');
INSERT INTO plan_feature (plan_id, text) VALUES (2, 'Custom growth roadmap');

-- Plan 3
INSERT INTO plan_feature (plan_id, text) VALUES (3, 'Bi-weekly strategy sessions');
INSERT INTO plan_feature (plan_id, text) VALUES (3, 'Business audit & feedback');
INSERT INTO plan_feature (plan_id, text) VALUES (3, 'Slack access for daily support');

-- Plan 4
INSERT INTO plan_feature (plan_id, text) VALUES (4, 'Weekly 1-on-1 coaching calls');
INSERT INTO plan_feature (plan_id, text) VALUES (4, '24/7 messaging support');
INSERT INTO plan_feature (plan_id, text) VALUES (4, 'Quarterly business reviews');

-- Plan 5
INSERT INTO plan_feature (plan_id, text) VALUES (5, 'Flexible call scheduling');
INSERT INTO plan_feature (plan_id, text) VALUES (5, 'Custom business strategy docs');
INSERT INTO plan_feature (plan_id, text) VALUES (5, 'Access to private founder group');
