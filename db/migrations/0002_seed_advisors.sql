-- USER TABLE INSERTS
INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Emma Johnson',
  'emma.johnson@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/1.jpg',
  '2023-12-10 08:15:00',
  '2023-12-10 08:15:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Michael Chen',
  'michael.chen@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/men/2.jpg',
  '2023-12-15 14:30:00',
  '2024-01-05 09:45:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Sophia Rodriguez',
  'sophia.rodriguez@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/3.jpg',
  '2023-12-18 11:20:00',
  '2023-12-18 11:20:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'David Kim',
  'david.kim@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/men/4.jpg',
  '2023-12-22 16:45:00',
  '2024-02-10 13:30:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Olivia Taylor',
  'olivia.taylor@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/5.jpg',
  '2024-01-05 09:10:00',
  '2024-01-05 09:10:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'James Wilson',
  'james.wilson@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/men/6.jpg',
  '2024-01-12 13:25:00',
  '2024-01-12 13:25:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Ava Martinez',
  'ava.martinez@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/7.jpg',
  '2024-01-18 10:30:00',
  '2024-02-25 15:40:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Ethan Brown',
  'ethan.brown@example.com',
  FALSE,
  'https://randomuser.me/api/portraits/men/8.jpg',
  '2024-01-24 14:50:00',
  '2024-01-24 14:50:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Isabella Clark',
  'isabella.clark@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/9.jpg',
  '2024-01-30 11:15:00',
  '2024-03-15 12:20:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Alexander Lee',
  'alexander.lee@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/men/10.jpg',
  '2024-02-05 16:40:00',
  '2024-02-05 16:40:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'Mia Johnson',
  'mia.johnson@example.com',
  TRUE,
  'https://randomuser.me/api/portraits/women/11.jpg',
  '2024-02-12 09:30:00',
  '2024-02-12 09:30:00'
);

INSERT INTO "user" ("name", "email", "email_verified", "image", "created_at", "updated_at")
VALUES (
  'William Davis',
  'william.davis@example.com',
  FALSE,
  'https://randomuser.me/api/portraits/men/12.jpg',
  '2024-02-18 15:20:00',
  '2024-02-18 15:20:00'
);

-- ADVISOR TABLE INSERTS (referencing user IDs from 1-12)
INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Financial Planner',
  'Certified financial planner with over 12 years of experience helping clients achieve financial independence through comprehensive retirement planning and investment strategies.',
  'Ms.',
  'New York',
  'New York',
  'United States',
  1,
  '2024-01-05 10:30:00',
  '2024-01-05 10:30:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Business Growth Strategist',
  'Former tech executive specialized in scaling startups from seed to Series B. Expertise in market positioning, operational efficiency, and building high-performing teams.',
  'Mr.',
  'San Francisco',
  'California',
  'United States',
  2,
  '2024-01-10 14:15:00',
  '2024-02-12 09:30:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Healthcare Consultant',
  'Board-certified physician with MBA focused on healthcare administration. Advises medical practices on improving patient care workflows and implementing digital health solutions.',
  'Dr.',
  'Boston',
  'Massachusetts',
  'United States',
  3,
  '2024-01-15 11:45:00',
  '2024-01-15 11:45:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Education Technology Specialist',
  'Former school principal with doctorate in educational technology. Helps educational institutions implement effective digital learning strategies and curriculum development.',
  'Dr.',
  'Chicago',
  'Illinois',
  'United States',
  4,
  '2024-01-20 13:20:00',
  '2024-03-05 16:10:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Investment Advisor',
  'Chartered financial analyst specializing in sustainable and ESG investing. Expertise in building diversified portfolios aligned with client values and financial goals.',
  'Mrs.',
  'Seattle',
  'Washington',
  'United States',
  5,
  '2024-01-25 09:50:00',
  '2024-01-25 09:50:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Fitness and Nutrition Coach',
  'Certified personal trainer and nutritionist with holistic approach to health. Specializes in creating sustainable fitness and nutrition plans for busy professionals.',
  'Mr.',
  'Denver',
  'Colorado',
  'United States',
  6,
  '2024-02-01 15:30:00',
  '2024-02-01 15:30:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Technology Consultant',
  'Software architect with extensive experience in cloud infrastructure and digital transformation. Helps businesses leverage technology to improve efficiency and customer experience.',
  'Ms.',
  'Austin',
  'Texas',
  'United States',
  7,
  '2024-02-05 11:15:00',
  '2024-03-12 14:25:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Creative Arts Director',
  'Award-winning artist and curator with MFA in Fine Arts. Provides mentorship to emerging artists and consults on portfolio development and exhibition strategies.',
  'Mr.',
  'Portland',
  'Oregon',
  'United States',
  8,
  '2024-02-10 10:45:00',
  '2024-02-10 10:45:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Personal Development Coach',
  'Certified life coach and bestselling author on mindfulness and productivity. Helps clients overcome limiting beliefs and develop effective strategies for personal and professional growth.',
  'Mrs.',
  'Miami',
  'Florida',
  'United States',
  9,
  '2024-02-15 13:40:00',
  '2024-03-20 09:15:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Real Estate Investment Advisor',
  'Licensed real estate broker with 15+ years of experience in commercial and residential property investments. Expert in market analysis and property acquisition strategies.',
  'Mr.',
  'Los Angeles',
  'California',
  'United States',
  10,
  '2024-02-20 16:20:00',
  '2024-02-20 16:20:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Scientific Research Consultant',
  'PhD in Biochemistry with expertise in pharmaceutical research and development. Advises on research methodology, grant writing, and clinical trial design.',
  'Dr.',
  'Cambridge',
  'Massachusetts',
  'United States',
  11,
  '2024-02-25 09:30:00',
  '2024-02-25 09:30:00'
);

INSERT INTO "advisor" ("title", "bio", "prefix", "city", "state", "country", "user_id", "created_at", "updated_at")
VALUES (
  'Marketing Strategy Expert',
  'Digital marketing specialist with background in consumer psychology. Helps businesses develop data-driven marketing campaigns and build effective brand narratives.',
  'Mr.',
  'Toronto',
  'Ontario',
  'Canada',
  12,
  '2024-03-01 14:10:00',
  '2024-03-01 14:10:00'
);
