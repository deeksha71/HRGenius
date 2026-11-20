-- HRGenius MySQL 8.0 reference schema
-- Primary implementation: Django migrations
-- Run migrations rather than this script for local development.

CREATE DATABASE IF NOT EXISTS hrgenius
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hrgenius;

CREATE TABLE IF NOT EXISTS departments (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(20) NOT NULL UNIQUE,
  description TEXT NULL,
  created_at DATETIME(6) NOT NULL,
  updated_at DATETIME(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS employees (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  date_of_joining DATE NOT NULL,
  department_id BIGINT UNSIGNED NOT NULL,
  designation_id BIGINT UNSIGNED NOT NULL,
  city VARCHAR(100) NOT NULL,
  basic_salary DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  INDEX idx_employee_department (department_id),
  INDEX idx_employee_status (status),
  CONSTRAINT fk_employee_department FOREIGN KEY (department_id)
    REFERENCES departments(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
