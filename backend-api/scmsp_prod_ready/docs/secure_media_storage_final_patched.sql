-- =========================================================
-- Secure Media Storage Final Project Database Script
-- Author: Christopher White II
-- Purpose: Final project database for a secure media storage business
-- DBMS: MySQL
-- =========================================================

-- ---------------------------------------------------------
-- 1. CREATE DATABASE
-- ---------------------------------------------------------
DROP DATABASE IF EXISTS secure_media_storage;
CREATE DATABASE secure_media_storage;
USE secure_media_storage;

-- ---------------------------------------------------------
-- 2. CREATE TABLES
-- ---------------------------------------------------------

-- Table 1: users
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    account_status VARCHAR(20) NOT NULL,
    created_at DATETIME NOT NULL
);

-- Table 2: roles
CREATE TABLE roles (
    role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_description VARCHAR(255)
);

-- Table 3: user_roles
CREATE TABLE user_roles (
    user_role_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    assigned_at DATETIME NOT NULL,
    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Table 4: subscriptions
CREATE TABLE subscriptions (
    subscription_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_name VARCHAR(50) NOT NULL,
    storage_limit_gb DECIMAL(10,2) NOT NULL,
    monthly_price DECIMAL(10,2) NOT NULL,
    max_devices INT NOT NULL,
    support_level VARCHAR(50)
);

-- Table 5: user_subscriptions
CREATE TABLE user_subscriptions (
    user_subscription_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    subscription_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    subscription_status VARCHAR(20) NOT NULL,
    CONSTRAINT fk_user_subscriptions_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_user_subscriptions_subscription
        FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id)
);

-- Table 6: folders
CREATE TABLE folders (
    folder_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    folder_name VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL,
    CONSTRAINT fk_folders_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Table 7: media_files
CREATE TABLE media_files (
    file_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    folder_id BIGINT NOT NULL,
    file_name VARCHAR(150) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size_mb DOUBLE NOT NULL,
    upload_date DATETIME NOT NULL,
    storage_path VARCHAR(255) NOT NULL,
    checksum_value VARCHAR(255),
    file_status VARCHAR(20) NOT NULL,
    CONSTRAINT fk_media_files_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_media_files_folder
        FOREIGN KEY (folder_id) REFERENCES folders(folder_id)
);

-- Table 8: encryption_keys
CREATE TABLE encryption_keys (
    encryption_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_id BIGINT NOT NULL,
    encryption_type VARCHAR(50) NOT NULL,
    key_reference VARCHAR(255) NOT NULL,
    encryption_status VARCHAR(20) NOT NULL,
    last_rotated DATETIME,
    CONSTRAINT fk_encryption_keys_file
        FOREIGN KEY (file_id) REFERENCES media_files(file_id)
);

-- Table 9: shared_files
CREATE TABLE shared_files (
    share_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_id BIGINT NOT NULL,
    owner_user_id BIGINT NOT NULL,
    shared_with_user_id BIGINT NOT NULL,
    permission_level VARCHAR(20) NOT NULL,
    shared_date DATETIME NOT NULL,
    expiration_date DATETIME,
    CONSTRAINT fk_shared_files_file
        FOREIGN KEY (file_id) REFERENCES media_files(file_id),
    CONSTRAINT fk_shared_files_owner
        FOREIGN KEY (owner_user_id) REFERENCES users(user_id),
    CONSTRAINT fk_shared_files_recipient
        FOREIGN KEY (shared_with_user_id) REFERENCES users(user_id)
);

-- Table 10: audit_logs
CREATE TABLE audit_logs (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    file_id BIGINT NULL,
    action_type VARCHAR(50) NOT NULL,
    action_timestamp DATETIME NOT NULL,
    action_details VARCHAR(255),
    ip_address VARCHAR(45),
    CONSTRAINT fk_audit_logs_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT fk_audit_logs_file
        FOREIGN KEY (file_id) REFERENCES media_files(file_id)
);

-- ---------------------------------------------------------
-- 3. INSERT SAMPLE DATA (AT LEAST 5 ROWS PER TABLE)
-- ---------------------------------------------------------

-- users
INSERT INTO users (first_name, last_name, email, password_hash, phone_number, account_status, created_at) VALUES
('Christopher', 'White', 'christopher.white@nubbymedia.com', 'hash_001_secure', '989-555-1001', 'Active', '2026-01-10 08:00:00'),
('Alicia', 'Brown', 'alicia.brown@nubbymedia.com', 'hash_002_secure', '989-555-1002', 'Active', '2026-01-11 09:30:00'),
('Marcus', 'Hill', 'marcus.hill@nubbymedia.com', 'hash_003_secure', '989-555-1003', 'Active', '2026-01-12 10:45:00'),
('Dana', 'Lopez', 'dana.lopez@nubbymedia.com', 'hash_004_secure', '989-555-1004', 'Suspended', '2026-01-13 11:15:00'),
('Tyler', 'Green', 'tyler.green@nubbymedia.com', 'hash_005_secure', '989-555-1005', 'Active', '2026-01-14 01:25:00');

-- roles
INSERT INTO roles (role_name, role_description) VALUES
('Admin', 'Full access to the secure media storage system'),
('Standard User', 'Can upload and manage personal media files'),
('Manager', 'Can review reports and manage team storage'),
('Auditor', 'Can review activity and compliance logs'),
('Support', 'Can help troubleshoot account issues');

-- user_roles
INSERT INTO user_roles (user_id, role_id, assigned_at) VALUES
(1, 1, '2026-01-15 08:00:00'),
(2, 2, '2026-01-15 08:05:00'),
(3, 3, '2026-01-15 08:10:00'),
(4, 4, '2026-01-15 08:15:00'),
(5, 5, '2026-01-15 08:20:00');

-- subscriptions
INSERT INTO subscriptions (plan_name, storage_limit_gb, monthly_price, max_devices, support_level) VALUES
('Basic', 100.00, 9.99, 2, 'Email'),
('Standard', 500.00, 19.99, 4, 'Priority Email'),
('Professional', 1000.00, 39.99, 6, 'Phone and Email'),
('Business', 5000.00, 99.99, 15, 'Dedicated Support'),
('Enterprise', 20000.00, 249.99, 50, '24/7 Premium');

-- user_subscriptions
INSERT INTO user_subscriptions (user_id, subscription_id, start_date, end_date, subscription_status) VALUES
(1, 5, '2026-01-20', NULL, 'Active'),
(2, 2, '2026-01-20', NULL, 'Active'),
(3, 4, '2026-01-21', NULL, 'Active'),
(4, 1, '2026-01-22', '2026-03-22', 'Expired'),
(5, 3, '2026-01-23', NULL, 'Active');

-- folders
INSERT INTO folders (user_id, folder_name, created_at) VALUES
(1, 'Marketing Videos', '2026-01-25 10:00:00'),
(2, 'Client Photos', '2026-01-25 10:15:00'),
(3, 'Internal Training', '2026-01-25 10:30:00'),
(4, 'Archived Files', '2026-01-25 10:45:00'),
(5, 'Audio Projects', '2026-01-25 11:00:00');

-- media_files
INSERT INTO media_files (user_id, folder_id, file_name, file_type, file_size_mb, upload_date, storage_path, checksum_value, file_status) VALUES
(1, 1, 'brand_launch.mp4', 'video/mp4', 850.40, '2026-02-01 09:00:00', '/secure_storage/videos/brand_launch.mp4', 'chk001a9', 'Active'),
(2, 2, 'client_event.jpg', 'image/jpeg', 12.80, '2026-02-01 09:30:00', '/secure_storage/images/client_event.jpg', 'chk002b8', 'Active'),
(3, 3, 'safety_training.mov', 'video/quicktime', 450.25, '2026-02-01 10:00:00', '/secure_storage/training/safety_training.mov', 'chk003c7', 'Active'),
(4, 4, 'old_campaign.zip', 'application/zip', 1200.55, '2026-02-01 10:30:00', '/secure_storage/archive/old_campaign.zip', 'chk004d6', 'Archived'),
(5, 5, 'podcast_intro.wav', 'audio/wav', 90.15, '2026-02-01 11:00:00', '/secure_storage/audio/podcast_intro.wav', 'chk005e5', 'Active');

-- encryption_keys
INSERT INTO encryption_keys (file_id, encryption_type, key_reference, encryption_status, last_rotated) VALUES
(1, 'AES-256', 'kms://key/media/001', 'Encrypted', '2026-02-05 08:00:00'),
(2, 'AES-256', 'kms://key/media/002', 'Encrypted', '2026-02-05 08:10:00'),
(3, 'RSA-2048', 'kms://key/media/003', 'Encrypted', '2026-02-05 08:20:00'),
(4, 'AES-256', 'kms://key/media/004', 'Encrypted', '2026-02-05 08:30:00'),
(5, 'ChaCha20', 'kms://key/media/005', 'Encrypted', '2026-02-05 08:40:00');

-- shared_files
INSERT INTO shared_files (file_id, owner_user_id, shared_with_user_id, permission_level, shared_date, expiration_date) VALUES
(1, 1, 2, 'View', '2026-02-10 09:00:00', '2026-05-10 09:00:00'),
(2, 2, 3, 'Edit', '2026-02-10 09:15:00', '2026-05-10 09:15:00'),
(3, 3, 1, 'View', '2026-02-10 09:30:00', '2026-05-10 09:30:00'),
(4, 4, 5, 'Download', '2026-02-10 09:45:00', '2026-05-10 09:45:00'),
(5, 5, 2, 'Edit', '2026-02-10 10:00:00', '2026-05-10 10:00:00');

-- audit_logs
INSERT INTO audit_logs (user_id, file_id, action_type, action_timestamp, action_details, ip_address) VALUES
(1, 1, 'UPLOAD', '2026-02-11 08:00:00', 'Uploaded brand launch video', '192.168.1.10'),
(2, 2, 'SHARE', '2026-02-11 08:15:00', 'Shared image with Marcus Hill', '192.168.1.11'),
(3, 3, 'DOWNLOAD', '2026-02-11 08:30:00', 'Downloaded safety training file', '192.168.1.12'),
(4, 4, 'ARCHIVE', '2026-02-11 08:45:00', 'Moved old campaign to archive', '192.168.1.13'),
(5, 5, 'UPDATE', '2026-02-11 09:00:00', 'Updated podcast intro audio metadata', '192.168.1.14');

-- ---------------------------------------------------------
-- 4. BASIC SELECT STATEMENTS TO SHOW DATA
-- ---------------------------------------------------------
SELECT * FROM users;
SELECT * FROM roles;
SELECT * FROM user_roles;
SELECT * FROM subscriptions;
SELECT * FROM user_subscriptions;
SELECT * FROM folders;
SELECT * FROM media_files;
SELECT * FROM encryption_keys;
SELECT * FROM shared_files;
SELECT * FROM audit_logs;

-- ---------------------------------------------------------
-- 5. FIVE DIFFERENT AND USEFUL JOIN QUERIES
-- ---------------------------------------------------------

-- Join Query 1: Show users and their role assignments
SELECT u.user_id, u.first_name, u.last_name, r.role_name, ur.assigned_at
FROM users u
JOIN user_roles ur ON u.user_id = ur.user_id
JOIN roles r ON ur.role_id = r.role_id;

-- Join Query 2: Show users and their subscription plans
SELECT u.user_id, u.first_name, u.last_name, s.plan_name, us.subscription_status
FROM users u
JOIN user_subscriptions us ON u.user_id = us.user_id
JOIN subscriptions s ON us.subscription_id = s.subscription_id;

-- Join Query 3: Show files with their folder and owner information
SELECT mf.file_id, mf.file_name, mf.file_type, f.folder_name, u.first_name, u.last_name
FROM media_files mf
JOIN folders f ON mf.folder_id = f.folder_id
JOIN users u ON mf.user_id = u.user_id;

-- Join Query 4: Show shared files and who received access
SELECT mf.file_name,
       owner.first_name AS owner_first_name,
       owner.last_name AS owner_last_name,
       recipient.first_name AS recipient_first_name,
       recipient.last_name AS recipient_last_name,
       sf.permission_level,
       sf.shared_date
FROM shared_files sf
JOIN media_files mf ON sf.file_id = mf.file_id
JOIN users owner ON sf.owner_user_id = owner.user_id
JOIN users recipient ON sf.shared_with_user_id = recipient.user_id;

-- Join Query 5: Show audit logs with user and file details
SELECT al.log_id,
       u.first_name,
       u.last_name,
       mf.file_name,
       al.action_type,
       al.action_timestamp,
       al.ip_address
FROM audit_logs al
JOIN users u ON al.user_id = u.user_id
LEFT JOIN media_files mf ON al.file_id = mf.file_id;

-- ---------------------------------------------------------
-- 6. CRUD OPERATIONS
-- ---------------------------------------------------------

-- CREATE: Add a new media file
INSERT INTO media_files
(user_id, folder_id, file_name, file_type, file_size_mb, upload_date, storage_path, checksum_value, file_status)
VALUES
(1, 1, 'new_product_ad.mp4', 'video/mp4', 610.25, NOW(), '/secure_storage/videos/new_product_ad.mp4', 'chk006f4', 'Active');

-- READ: Display the newly inserted media file
SELECT *
FROM media_files
WHERE file_name = 'new_product_ad.mp4';

-- UPDATE: Change the status of the new media file
UPDATE media_files
SET file_status = 'Archived'
WHERE file_name = 'new_product_ad.mp4';

-- READ AFTER UPDATE: Confirm the update worked
SELECT *
FROM media_files
WHERE file_name = 'new_product_ad.mp4';

-- DELETE: Remove a share record
DELETE FROM shared_files
WHERE share_id = 1;

-- READ AFTER DELETE: Show remaining share records
SELECT * FROM shared_files;

-- ---------------------------------------------------------
-- 7. EXTRA LOCAL DATABASE USER AND CRUD PRIVILEGES
-- ---------------------------------------------------------
-- Note: Run these only if your MySQL account has permission to create users.

CREATE USER IF NOT EXISTS 'media_user'@'localhost' IDENTIFIED BY 'SecurePass123!';
GRANT SELECT, INSERT, UPDATE, DELETE ON secure_media_storage.* TO 'media_user'@'localhost';
FLUSH PRIVILEGES;

-- ---------------------------------------------------------
-- 8. FUTURE USE DESCRIPTION (FOR WRITE-UP)
-- ---------------------------------------------------------
-- This database could continue to be used after the course as the
-- foundation for a secure media storage platform. It can manage users,
-- files, subscriptions, security actions, encryption information, and
-- file sharing. In the future, more tables could be added for billing,
-- failed login attempts, password reset requests, storage analytics,
-- and administrative reporting.


-- =========================================================
-- 9. FINAL PATCH FOR SCOPE ALIGNMENT
-- Adds tagging, AI processing tracking, richer sharing,
-- and stronger audit detail for the college final project.
-- =========================================================

-- ---------------------------------------------------------
-- 9.1 EXTEND media_files
-- ---------------------------------------------------------
ALTER TABLE media_files
    ADD COLUMN cloud_object_key VARCHAR(255) NULL AFTER storage_path,
    ADD COLUMN is_encrypted BOOLEAN NOT NULL DEFAULT TRUE AFTER checksum_value,
    ADD COLUMN processing_status VARCHAR(30) NOT NULL DEFAULT 'Pending' AFTER is_encrypted,
    ADD COLUMN visibility_level VARCHAR(30) NOT NULL DEFAULT 'Private' AFTER processing_status,
    ADD COLUMN file_description VARCHAR(255) NULL AFTER visibility_level;

-- ---------------------------------------------------------
-- 9.2 EXTEND shared_files
-- ---------------------------------------------------------
ALTER TABLE shared_files
    ADD COLUMN share_status VARCHAR(20) NOT NULL DEFAULT 'Active' AFTER expiration_date,
    ADD COLUMN access_code VARCHAR(100) NULL AFTER share_status;

-- ---------------------------------------------------------
-- 9.3 EXTEND audit_logs
-- ---------------------------------------------------------
ALTER TABLE audit_logs
    ADD COLUMN result_status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS' AFTER action_details,
    ADD COLUMN user_agent VARCHAR(255) NULL AFTER ip_address;

-- ---------------------------------------------------------
-- 9.4 CREATE tags
-- ---------------------------------------------------------
CREATE TABLE tags (
    tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(100) NOT NULL UNIQUE,
    tag_type VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------
-- 9.5 CREATE media_tags (many-to-many bridge)
-- ---------------------------------------------------------
CREATE TABLE media_tags (
    media_tag_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    tagged_by VARCHAR(30) NOT NULL DEFAULT 'AI',
    confidence_score DOUBLE NULL,
    tagged_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_tags_file
        FOREIGN KEY (file_id) REFERENCES media_files(file_id),
    CONSTRAINT fk_media_tags_tag
        FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    CONSTRAINT uq_media_tags UNIQUE (file_id, tag_id)
);

-- ---------------------------------------------------------
-- 9.6 CREATE processing_jobs
-- ---------------------------------------------------------
CREATE TABLE processing_jobs (
    job_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    file_id BIGINT NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    job_status VARCHAR(30) NOT NULL DEFAULT 'Queued',
    requested_by_user_id BIGINT NOT NULL,
    requested_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at DATETIME NULL,
    completed_at DATETIME NULL,
    processor_name VARCHAR(100) NULL,
    output_summary VARCHAR(255) NULL,
    error_message VARCHAR(255) NULL,
    CONSTRAINT fk_processing_jobs_file
        FOREIGN KEY (file_id) REFERENCES media_files(file_id),
    CONSTRAINT fk_processing_jobs_user
        FOREIGN KEY (requested_by_user_id) REFERENCES users(user_id)
);

-- ---------------------------------------------------------
-- 9.7 INDEXES
-- ---------------------------------------------------------
CREATE INDEX idx_media_files_processing_status ON media_files(processing_status);
CREATE INDEX idx_media_files_visibility_level ON media_files(visibility_level);
CREATE INDEX idx_shared_files_status ON shared_files(share_status);
CREATE INDEX idx_audit_logs_action_timestamp ON audit_logs(action_timestamp);
CREATE INDEX idx_processing_jobs_status ON processing_jobs(job_status);
CREATE INDEX idx_tags_tag_name ON tags(tag_name);

-- ---------------------------------------------------------
-- 9.8 UPDATE EXISTING MEDIA WITH CLOUD-STYLE VALUES
-- ---------------------------------------------------------
UPDATE media_files
SET cloud_object_key = 'media/videos/brand_launch.mp4',
    processing_status = 'Completed',
    visibility_level = 'Internal',
    file_description = 'Main brand launch campaign video'
WHERE file_id = 1;

UPDATE media_files
SET cloud_object_key = 'media/images/client_event.jpg',
    processing_status = 'Completed',
    visibility_level = 'Shared',
    file_description = 'Client event photo asset'
WHERE file_id = 2;

UPDATE media_files
SET cloud_object_key = 'media/training/safety_training.mov',
    processing_status = 'Completed',
    visibility_level = 'Internal',
    file_description = 'Internal employee safety training video'
WHERE file_id = 3;

UPDATE media_files
SET cloud_object_key = 'media/archive/old_campaign.zip',
    processing_status = 'Archived',
    visibility_level = 'Private',
    file_description = 'Archived campaign package'
WHERE file_id = 4;

UPDATE media_files
SET cloud_object_key = 'media/audio/podcast_intro.wav',
    processing_status = 'Completed',
    visibility_level = 'Internal',
    file_description = 'Podcast intro sound asset'
WHERE file_id = 5;

UPDATE media_files
SET cloud_object_key = 'media/videos/new_product_ad.mp4',
    processing_status = 'Pending',
    visibility_level = 'Internal',
    file_description = 'New product ad awaiting final review'
WHERE file_name = 'new_product_ad.mp4';

-- ---------------------------------------------------------
-- 9.9 UPDATE EXISTING SHARES
-- ---------------------------------------------------------
UPDATE shared_files
SET share_status = 'Active',
    access_code = 'VIEW-ALICIA-001'
WHERE share_id = 2;

UPDATE shared_files
SET share_status = 'Active',
    access_code = 'EDIT-MARCUS-002'
WHERE share_id = 3;

UPDATE shared_files
SET share_status = 'Expired',
    access_code = 'DOWN-TYLER-004'
WHERE share_id = 4;

UPDATE shared_files
SET share_status = 'Active',
    access_code = 'EDIT-ALICIA-005'
WHERE share_id = 5;

-- Note: share_id = 1 is deleted earlier in the CRUD section.

-- ---------------------------------------------------------
-- 9.10 UPDATE EXISTING AUDIT LOGS
-- ---------------------------------------------------------
UPDATE audit_logs
SET result_status = 'SUCCESS',
    user_agent = 'Chrome on Windows'
WHERE log_id = 1;

UPDATE audit_logs
SET result_status = 'SUCCESS',
    user_agent = 'Edge on Windows'
WHERE log_id = 2;

UPDATE audit_logs
SET result_status = 'SUCCESS',
    user_agent = 'Firefox on Linux'
WHERE log_id = 3;

UPDATE audit_logs
SET result_status = 'SUCCESS',
    user_agent = 'Chrome on Mac'
WHERE log_id = 4;

UPDATE audit_logs
SET result_status = 'SUCCESS',
    user_agent = 'Safari on Mac'
WHERE log_id = 5;

-- ---------------------------------------------------------
-- 9.11 INSERT SAMPLE TAGS
-- ---------------------------------------------------------
INSERT INTO tags (tag_name, tag_type) VALUES
('Marketing', 'AI'),
('Training', 'AI'),
('Audio', 'AI'),
('Image', 'AI'),
('Archive', 'AI');

-- ---------------------------------------------------------
-- 9.12 INSERT SAMPLE MEDIA_TAGS
-- ---------------------------------------------------------
INSERT INTO media_tags (file_id, tag_id, tagged_by, confidence_score) VALUES
(1, 1, 'AI', 96.50),
(2, 4, 'AI', 94.10),
(3, 2, 'AI', 91.75),
(4, 5, 'AI', 89.40),
(5, 3, 'AI', 97.20);

-- ---------------------------------------------------------
-- 9.13 INSERT SAMPLE PROCESSING JOBS
-- ---------------------------------------------------------
INSERT INTO processing_jobs
(file_id, job_type, job_status, requested_by_user_id, requested_at, started_at, completed_at, processor_name, output_summary)
VALUES
(1, 'AI_TAGGING', 'Completed', 1, '2026-02-01 09:05:00', '2026-02-01 09:06:00', '2026-02-01 09:08:00', 'Python Lambda', 'Detected marketing-related video content'),
(2, 'AI_TAGGING', 'Completed', 2, '2026-02-01 09:35:00', '2026-02-01 09:36:00', '2026-02-01 09:37:00', 'Python Lambda', 'Detected image and event-related content'),
(3, 'TRANSCRIPTION', 'Completed', 3, '2026-02-01 10:05:00', '2026-02-01 10:06:00', '2026-02-01 10:11:00', 'Python Lambda', 'Generated training transcript'),
(4, 'AI_TAGGING', 'Completed', 4, '2026-02-01 10:35:00', '2026-02-01 10:36:00', '2026-02-01 10:39:00', 'Python Lambda', 'Marked asset as archive content'),
(5, 'AUDIO_ANALYSIS', 'Completed', 5, '2026-02-01 11:05:00', '2026-02-01 11:06:00', '2026-02-01 11:08:00', 'Python Lambda', 'Detected intro music and voice content'),
(6, 'AI_TAGGING', 'Queued', 1, NOW(), NULL, NULL, 'Python Lambda', 'Awaiting processing for new product ad');

-- ---------------------------------------------------------
-- 9.14 FINAL PROJECT QUERIES
-- ---------------------------------------------------------

-- Query A: Files with tags
SELECT mf.file_id,
       mf.file_name,
       t.tag_name,
       mt.tagged_by,
       mt.confidence_score
FROM media_files mf
JOIN media_tags mt ON mf.file_id = mt.file_id
JOIN tags t ON mt.tag_id = t.tag_id
ORDER BY mf.file_id;

-- Query B: Files and processing jobs
SELECT mf.file_name,
       pj.job_type,
       pj.job_status,
       pj.processor_name,
       pj.output_summary
FROM media_files mf
JOIN processing_jobs pj ON mf.file_id = pj.file_id
ORDER BY pj.job_id;

-- Query C: Secure share access view
SELECT sf.share_id,
       mf.file_name,
       u1.first_name AS owner_first_name,
       u1.last_name AS owner_last_name,
       u2.first_name AS recipient_first_name,
       u2.last_name AS recipient_last_name,
       sf.permission_level,
       sf.share_status,
       sf.expiration_date
FROM shared_files sf
JOIN media_files mf ON sf.file_id = mf.file_id
JOIN users u1 ON sf.owner_user_id = u1.user_id
JOIN users u2 ON sf.shared_with_user_id = u2.user_id
ORDER BY sf.share_id;

-- Query D: Audit trail with result status
SELECT al.log_id,
       u.first_name,
       u.last_name,
       mf.file_name,
       al.action_type,
       al.result_status,
       al.action_timestamp,
       al.ip_address,
       al.user_agent
FROM audit_logs al
JOIN users u ON al.user_id = u.user_id
LEFT JOIN media_files mf ON al.file_id = mf.file_id
ORDER BY al.action_timestamp DESC;

-- Query E: Files ready for secure download
SELECT file_id,
       file_name,
       cloud_object_key,
       is_encrypted,
       processing_status,
       visibility_level
FROM media_files
WHERE file_status = 'Active'
  AND processing_status = 'Completed';

