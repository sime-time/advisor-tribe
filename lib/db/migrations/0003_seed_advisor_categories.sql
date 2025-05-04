-- Advisor 1: Financial Planner
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(1, 4, true),     -- Finance (Primary)
(1, 1, false),    -- Business
(1, 10, false);   -- Science

-- Advisor 2: Business Growth Strategist
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(2, 1, true),     -- Business (Primary)
(2, 6, false),    -- Technology
(2, 8, false);    -- Personal Development

-- Advisor 3: Healthcare Consultant
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(3, 2, true),     -- Healthcare (Primary)
(3, 6, false),    -- Technology
(3, 4, false);    -- Finance

-- Advisor 4: Education Technology Specialist
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(4, 3, true),     -- Education (Primary)
(4, 6, false),    -- Technology
(4, 8, false);    -- Personal Development

-- Advisor 5: Investment Advisor
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(5, 4, true),     -- Finance (Primary)
(5, 1, false),    -- Business
(5, 2, false);    -- Healthcare

-- Advisor 6: Fitness and Nutrition Coach
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(6, 5, true),     -- Fitness (Primary)
(6, 8, false),    -- Personal Development
(6, 2, false);    -- Healthcare

-- Advisor 7: Technology Consultant
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(7, 6, true),     -- Technology (Primary)
(7, 1, false),    -- Business
(7, 4, false);    -- Finance

-- Advisor 8: Creative Arts Director
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(8, 7, true),     -- Arts (Primary)
(8, 8, false),    -- Personal Development
(8, 3, false);    -- Education

-- Advisor 9: Personal Development Coach
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(9, 8, true),     -- Personal Development (Primary)
(9, 5, false),    -- Fitness
(9, 3, false);    -- Education

-- Advisor 10: Real Estate Investment Advisor
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(10, 9, true),    -- Real Estate (Primary)
(10, 4, false),   -- Finance
(10, 1, false);   -- Business

-- Advisor 11: Scientific Research Consultant
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(11, 10, true),   -- Science (Primary)
(11, 2, false),   -- Healthcare
(11, 6, false);   -- Technology

-- Advisor 12: Marketing Strategy Expert
INSERT INTO advisor_category (advisor_id, category_id, is_primary) VALUES
(12, 1, true),    -- Business (Primary)
(12, 7, false),   -- Arts
(12, 8, false);   -- Personal Development
