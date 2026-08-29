USE portfolio;

-- =========================================
-- EDUCATION
-- =========================================

INSERT INTO education
(degree, institution, location, start_year, end_year, description)
VALUES
(
    'B.Tech in Computer Science and Engineering',
    'Galgotias University',
    'Greater Noida, Uttar Pradesh',
    2023,
    2027,
    'Bachelor of Technology in Computer Science and Engineering.'
),
(
    'Senior Secondary (Class 12)',
    'CBSE',
    'India',
    2021,
    2022,
    'Senior Secondary Education.'
),
(
    'Secondary (Class 10)',
    'CBSE',
    'India',
    2019,
    2020,
    'Secondary Education.'
);


-- =========================================
-- EXPERIENCE
-- =========================================

INSERT INTO experience
(company, position, location, start_date, end_date, is_current, description)
VALUES
(
    'Full Stack Development Internship',
    'Full Stack Developer Intern',
    'India',
    '2025-01-01',
    '2025-04-01',
    FALSE,
    'Worked on full-stack web development using React.js, Node.js and database technologies. Developed dynamic web applications and integrated frontend, backend and database functionality.'
);


-- =========================================
-- SKILLS
-- =========================================

INSERT INTO skills (category, name)
VALUES
-- Frontend
('Frontend', 'HTML'),
('Frontend', 'CSS'),
('Frontend', 'JavaScript'),
('Frontend', 'React.js'),
('Frontend', 'Tailwind CSS'),
('Frontend', 'Bootstrap'),

-- Backend
('Backend', 'Node.js'),
('Backend', 'Express.js'),
('Backend', 'REST APIs'),

-- Programming
('Programming', 'Java'),
('Programming', 'Python'),
('Programming', 'Data Structures & Algorithms'),

-- Database
('Database', 'MySQL'),
('Database', 'MS SQL'),
('Database', 'MongoDB'),

-- Tools
('Tools & Technologies', 'Git'),
('Tools & Technologies', 'GitHub'),
('Tools & Technologies', 'VS Code'),
('Tools & Technologies', 'Postman'),
('Tools & Technologies', 'AWS');


-- =========================================
-- PROJECTS
-- =========================================

INSERT INTO projects
(title, description, technologies, github_url, live_url, image_url)
VALUES
(
    'Agri Connector',
    'A full-stack platform designed to connect farmers with users through a modern web application.',
    'HTML, CSS, JavaScript, React.js, Node.js, MySQL',
    '',
    '',
    ''
),
(
    'EduSphere',
    'A modern campus hub designed to provide students with access to college-related services and information.',
    'React.js, Tailwind CSS',
    '',
    '',
    ''
),
(
    'Dynamic Blog Platform',
    'A full-stack dynamic blog application with frontend, backend and database integration.',
    'React.js, Node.js, Express.js, MySQL',
    '',
    '',
    ''
);


-- =========================================
-- CERTIFICATIONS
-- =========================================

-- Add your real certifications here later.
-- Example:
--
-- INSERT INTO certifications
-- (title, organization, issue_date, credential_url, description)
-- VALUES
-- (
--     'Certification Name',
--     'Organization Name',
--     '2025-01-01',
--     'https://example.com',
--     'Certification description.'
-- );


-- =========================================
-- CODING STATISTICS
-- =========================================

-- Add your actual coding platform statistics later.
-- Example:
--
-- INSERT INTO coding_stats
-- (platform, username, profile_url, problems_solved, rating)
-- VALUES
-- (
--     'LeetCode',
--     'YOUR_USERNAME',
--     'YOUR_PROFILE_URL',
--     0,
--     0
-- );


-- =========================================
-- BLOG POSTS
-- =========================================

INSERT INTO blog_posts
(title, slug, excerpt, content, category, published)
VALUES
(
    'Getting Started with Data Structures and Algorithms',
    'getting-started-with-data-structures-and-algorithms',
    'A beginner-friendly introduction to learning Data Structures and Algorithms.',
    'Data Structures and Algorithms are important foundations for solving programming problems efficiently. Starting with arrays, strings and basic problem-solving patterns can help build strong programming fundamentals.',
    'DSA',
    TRUE
),
(
    'Building a Full Stack Web Application',
    'building-a-full-stack-web-application',
    'Understanding how frontend, backend and databases work together.',
    'A full-stack application connects the frontend user interface with backend APIs and a database. React can be used for the frontend, Node.js and Express.js for the backend, and MySQL for storing application data.',
    'Web Development',
    TRUE
);


-- =========================================
-- COMMENTS
-- =========================================

-- Comments will be added through the application.


-- =========================================
-- CONTACT MESSAGES
-- =========================================

-- Contact messages will be added through the contact form.


-- =========================================
-- USERS
-- =========================================

-- Admin user will be created securely through the backend.
-- Do NOT store a plain-text password here.
