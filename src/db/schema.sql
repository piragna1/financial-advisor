-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PROFILES
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_date DATE,
  location VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  avatar_url TEXT,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- FINANCIAL PROFILES
CREATE TABLE financial_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  salary NUMERIC(12,2) NOT NULL CHECK (salary >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- LOANS
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  financial_profile_id UUID NOT NULL,
  start_date DATE NOT NULL,
  term_years INTEGER NOT NULL CHECK (term_years > 0),
  principal NUMERIC(12,2) NOT NULL CHECK (principal > 0),
  interest_rate NUMERIC(5,2) NOT NULL CHECK (interest_rate >= 0),
  payment_frequency_per_year INTEGER NOT NULL CHECK (payment_frequency_per_year > 0),
  compounding_frequency_per_year INTEGER NOT NULL CHECK (compounding_frequency_per_year > 0),
  grace_period_months INTEGER DEFAULT 0 CHECK (grace_period_months >= 0),
  balloon_payment NUMERIC(12,2) DEFAULT 0 CHECK (balloon_payment >= 0),
  loan_type VARCHAR(50) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  saved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (financial_profile_id) REFERENCES financial_profiles(id) ON DELETE CASCADE
);

-- SCHEDULES
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID UNIQUE NOT NULL,
  plan VARCHAR(10) NOT NULL CHECK (plan IN ('weekly', 'monthly', 'custom')),
  start_date DATE NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  currency VARCHAR(10) NOT NULL,
  installments INTEGER NOT NULL CHECK (installments > 0),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
);

-- PAYMENTS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL,
  due_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(10) NOT NULL CHECK (status IN ('pending', 'paid', 'failed')),
  paid_at TIMESTAMP,
  method VARCHAR(20) CHECK (method IN ('credit-card', 'bank-transfer', 'cash')),
  reference TEXT,
  notes TEXT,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
);

-- INDEXES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_financial_profiles_user_id ON financial_profiles(user_id);
CREATE INDEX idx_loans_financial_profile_id ON loans(financial_profile_id);
CREATE INDEX idx_payments_schedule_id ON payments(schedule_id);
