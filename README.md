# Financial advisor
This is a personal project for Solvd. company's LABA program for NodeJS backend development.
##
## Table of content

| Section                | Subsections                                                                                                                                           |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Overview](#overview)  |                                                                                                                                                             |
| [Summary](#summary) |                                                                                                                     |
| [Task Description](#Description)  |                                                                                                                                                             |
| [Setup](#setup)        |                                                                                                                                                       |
| [Authentication](#authentication) | 
| [Relationships](#relationships) | 
| [Endpoints](#endpoints) | 
## 
### Overview
The main idea is to help me (and maybe others) learn the basics of managing personal finances with some simple tools and calculators. Since I’m still learning, the features are pretty basic, and I’m figuring things out as I go. The application lets users try out different financial strategies and see how their decisions might affect their money over time. It’s a work in progress, and I hope to improve it as I learn more!
##
### Summary
This loan simulation system that handles JWT authentication, works connected to a database, can be reconstructed with Docker and handles http requests through an api.
##
### Task Description
**Personal Finance Advisor**: Create a financial advisor application. Users can input their salary, preferred currency, and desired annual interest rate. The system calculates the maximum loan amount they can obtain, the repayment plan, and the total interest paid over the loan term.
##
### Authentication
This system uses JWT authentication process with tokens.
#### Sign up
Send POST request to http://localhost:3000/auth/register  with the corresponded information in order to successfully sign up to the system. See the following example:
```code
{
    "name":"Gonzalo",
    "lastName":"Varela Alagna",
    "email":"gvalagna@gmail.com",
    "password":"gvalagnA$4"
}
```
##### Example of response: 
```code
{
      message: "User registered",
      user: {
        id: "u1",
        email: "gvalagna@example.con",
      },
    }
```
    
#### Sign in
Send POST request to http://localhost:3000/auth/login  with the corresponded information in order to successfully sign in to the system. See the following example:
```code
{
  "email": "gvalagna@gmail.com",
  "password": "gvalagnA$4"
}
```

##### Example of response:
```code
{ user, token } (upd)
```
##
### Relationships
#### User - x

User - Profile -> (1:1) An user has a profile while the profile belongs to that user.

User - FinancialProfile -> (1:1) An user has a financial profile while that financial profile belongs to the user.


#### Profile - x 
Profile - User -> (1:1) The profile belongs to the user while the user owns that profile.


#### FinancialProfile - x
FinancialProfile - User -> (1:1) The financial profile belongs to the user that owns that profile.

FinancialProfile - Loan -> (1:N) A financial profile can simulate 0 or many loans while any loan belongs to that profile.


#### Loan - x
Loan - FinancialProfile -> (1:1) A loan belongs to a financial profile.

Loan - Schedule -> (1:1) A loan has its own payments schedule.


#### Schedule - x
Schedule - Loan -> (1:1) A payments schedule belongs to a specific loan.

Schedule - Payment -> (1:N) A schedule may consists of 1 or more payments.


#### Payment - x
Payment - Schedule -> (1:1) A payment belongs to a specific loan schedule.
##  
### Setup

#### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/financial-advisor1.2.git
cd financial-advisor1.2
```
2. Install dependencies:
```bash
npm install
```

3. Execute the server locally
```bash
npm start
```

#### Environment Variables
Create a .env file in the root of the project with the following content:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=prestamos_db
```
These variables are used in src/config/db.config.js or its equivalent.

#### Troubleshooting
```code
- nodemon: not found → Run npm install --save-dev nodemon
- Cannot find module → Check import paths and file names
- Docker not connecting to the database → Make sure depends_on is set in docker-compose.yml
```

### Database Initialization

To initialize the database schema from scratch:

1. Make sure PostgreSQL is running and accessible

2. Create a `.env` file in the root of the project with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=prestamos_db
```
3. Run the setup script :
```bash
node database/setupDatabase.js
```
This will:

Connect to the default postgres database

Create prestamos_db if it doesn't exist

Execute schema.sql to create all tables, relationships, and constraints
####

#### Docker Setup
```bash
docker compose up --build
```
This will start:

🐘 PostgreSQL on port 5432

⚙️ Backend on http://localhost:3000

Confirm it's working: Check the logs for:
```bash
Server running on port 3000
Database system is ready to accept connections
```
##
### Endpoints
🔐 Authentication
POST /auth/register
Registers a new user.

Request:
```json
{
  "name": "Gonzalo",
  "lastName": "Varela Alagna",
  "email": "gvalagna@gmail.com",
  "password": "gvalagnA$4"
}
```

Response:

```json
{
  "message": "User registered",
  "user": {
    "id": "u1",
    "email": "gvalagna@example.com"
  }
}
```


POST /auth/login
Authenticates a user and returns a JWT token.

Request:
```json

{
  "email": "gvalagna@gmail.com",
  "password": "gvalagnA$4"
}
```

Response:

```json
{
  "user": {
    "id": "u1",
    "email": "gvalagna@example.com"
  },
  "token": "..."
}
```

🔐 PUT /users — Update Authenticated User
Description: Allows an authenticated user to update their own email and/or password. Password is automatically hashed before storage. 
Email must be unique — duplicates are rejected.

Authentication: ✅ Requires valid token in Authorization header ✅ Enforces ownership: users can only update their own account
```code
Authorization: Bearer <token (obtained when logging in)>
Content-Type: application/json
```

Request body:
```json
{
  "email": "newemail@example.com",       // optional
  "password": "newSecurePassword123!"    // optional
}
```


👤 Profile
POST /profiles
Creates a profile for a user.

Request:
```json
{
  "userId": "user-uuid",
  "firstName": "Gonzalo",
  "lastName": "Varela",
  "birthDate": "1990-01-01"
}
```
Response:
```json
{
  "message": "Profile created",
  "profile": { ... }
}
```

GET /profiles/email/:email
Retrieves a profile by email.

Response:
```json
{
  "profile": { ... }
}
```
🔐 PUT /profiles — Update Authenticated User's Profile
Description: Allows an authenticated user to update their own profile. All fields are optional and sanitized before storage.

Authentication: ✅ Requires valid token ✅ Enforces ownership via req.userId

Headers:

DELETE /profiles
Deletes a profile by ID.
```code
Authorization: Bearer <token>
Content-Type: application/json
```
Request body:
```json
{
  "firstName": "Gonzalo",
  "lastName": "Varela",
  "birthDate": "1990-05-12",
  "location": "Mar del Plata",
  "language": "es",
  "avatarUrl": "https://example.com/avatar.jpg",
  "bio": "Backend architect and validation freak"
}
```
Response:
```json
{
  "message": "Profile updated",
  "updated": {
    "user_id": "e44596fa-c4a5-460b-8ce6-97d9f516610b",
    "first_name": "Gonzalo",
    "last_name": "Varela",
    ...
  }
}

```
Errors:
```code

401 UNAUTHORIZED — missing or invalid token

403 FORBIDDEN — trying to update another user’s profile

404 NOT FOUND — profile not found

400 BAD REQUEST — invalid input structure
```

Request:
```json
{
  "id": "profile-uuid"
}
```


Response:
```json
{
  "message": "Profile deleted",
  "deleted": { ... }
}
```


💰 Financial Profile
POST /financial-profiles
Creates a financial profile for a user
Request:
```json

{
  "userId": "user-uuid",
  "salary": 85000
}
```

Response:
```json
{
  "message": "Financial profile created",
  "profile": { ... }
}
```


💸 Loans
POST /loans
Creates a loan tied to a financial profile.

Request:
```json
{
  "financialProfileId": "fp-uuid",
  "startDate": "2025-10-01",
  "termYears": 5,
  "principal": 10000,
  "interestRate": 4.5,
  "paymentFrequencyPerYear": 12,
  "compoundingFrequencyPerYear": 12,
  "gracePeriodMonths": 0,
  "balloonPayment": 0,
  "loanType": "personal",
  "currency": "USD"
}
```

Response:
```json
{
  "message": "Loan saved",
  "loan": { ... }
}
```

DELETE /loans
Deletes a loan by ID.

Request:
```json
{
  "id": "loan-uuid"
}
```
Response:
```json
{
  "message": "Loan deleted",
  "deleted": { ... }
}
```


