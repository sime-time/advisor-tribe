-- Advisor 6
INSERT INTO plan (advisor_id, title, description) VALUES
(6, 'Startup Sprint', '1-on-1 coaching to launch your business idea quickly and effectively.'),
(6, 'Lean Launchpad', 'Mentorship for validating your product and finding early traction.');

-- Advisor 7
INSERT INTO plan (advisor_id, title, description) VALUES
(7, 'Solo Founder Strategy', 'Support for solo founders navigating early-stage growth.');

-- Advisor 8
INSERT INTO plan (advisor_id, title, description) VALUES
(8, 'Scaling Systems', 'Hands-on coaching to scale operations and delegate effectively.'),
(8, 'Leadership Upgrade', 'Mentorship for founders growing into leadership roles.');

-- Advisor 9
INSERT INTO plan (advisor_id, title, description) VALUES
(9, 'MVP Coaching', 'Guidance for building and launching your minimum viable product.'),
(9, 'Fundraising Prep', '1-on-1 help to prepare for investor conversations and pitch decks.');

-- Advisor 10
INSERT INTO plan (advisor_id, title, description) VALUES
(10, 'Side Hustle to Startup', 'Mentorship to turn your side project into a real business.');

-- Advisor 11
INSERT INTO plan (advisor_id, title, description) VALUES
(11, 'Creative Founder Track', 'Business coaching for creatives building sustainable income.'),
(11, 'Client Funnel Fix', 'Coaching to attract and convert high-value clients consistently.');

-- Advisor 12
INSERT INTO plan (advisor_id, title, description) VALUES
(12, 'Agency Growth Plan', 'Mentorship for service-based entrepreneurs scaling their agency.');

-- Plan IDs 6–16
INSERT INTO plan_pricing (plan_id, frequency, amount) VALUES
(6, 'month', 24900), (6, 'year', 249000),
(7, 'month', 19900), (7, 'year', 199000),
(8, 'month', 34900), (8, 'year', 349000),
(9, 'month', 39900), (9, 'year', 399000),
(10, 'month', 29900), (10, 'year', 299000),
(11, 'month', 17900), (11, 'year', 179000),
(12, 'month', 27900), (12, 'year', 279000),
(13, 'month', 35900), (13, 'year', 359000),
(14, 'month', 22900), (14, 'year', 229000),
(15, 'month', 18900), (15, 'year', 189000),
(16, 'month', 44900), (16, 'year', 449000);

-- Plan 6
INSERT INTO plan_feature (plan_id, text) VALUES
(6, '2 coaching calls per month'),
(6, 'Business model canvas review'),
(6, 'Weekly accountability check-ins');

-- Plan 7
INSERT INTO plan_feature (plan_id, text) VALUES
(7, '1 coaching call per month'),
(7, 'Goal setting and progress tracking');

-- Plan 8
INSERT INTO plan_feature (plan_id, text) VALUES
(8, '4 coaching calls per month'),
(8, 'Operations system templates'),
(8, 'Asynchronous support via chat');

-- Plan 9
INSERT INTO plan_feature (plan_id, text) VALUES
(9, 'Pitch deck review'),
(9, 'Investor Q&A prep'),
(9, 'Weekly mock pitches');

-- Plan 10
INSERT INTO plan_feature (plan_id, text) VALUES
(10, 'Side hustle roadmap'),
(10, 'Weekly focus sessions'),
(10, 'Direct messaging access');

-- Plan 11
INSERT INTO plan_feature (plan_id, text) VALUES
(11, 'Niche clarity coaching'),
(11, 'Offer refinement workshops'),
(11, '1 monthly feedback session');

-- Plan 12
INSERT INTO plan_feature (plan_id, text) VALUES
(12, 'Marketing funnel audit'),
(12, 'Weekly coaching calls');

-- Plan 13
INSERT INTO plan_feature (plan_id, text) VALUES
(13, '1-on-1 leadership coaching'),
(13, 'Custom KPIs and dashboards'),
(13, 'Slack channel access');

-- Plan 14
INSERT INTO plan_feature (plan_id, text) VALUES
(14, 'Client avatar development'),
(14, 'Sales call script training');

-- Plan 15
INSERT INTO plan_feature (plan_id, text) VALUES
(15, 'Weekly mindset coaching'),
(15, 'Creative business toolkit');

-- Plan 16
INSERT INTO plan_feature (plan_id, text) VALUES
(16, 'Agency systems templates'),
(16, 'Unlimited text support'),
(16, '2 live sessions per month');
