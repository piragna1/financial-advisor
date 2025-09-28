# Financial advisor
This is a personal project for Solvd. company's LABA program for NodeJS backend development.
##
## Table of content

| Section                | Subsections                                                                                                                                           |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Overview](#overview)  |                                                                                                                                                             |
| [Task Description](#Description)  |                                                                                                                                                             |
| [Setup](#setup)        |                                                                                                                                                       |
| [Summary](#summary) |                                                                                                                     |
| [Authentication](#authentication) | 
| [Relationships](#relationships) | 
| [Endpoints API Documentation](./documentation/ENDPOINTS-README.md#endpoints-api-documentation) | 
## 
### Overview
The main idea is to help me (and maybe others) learn the basics of managing personal finances with some simple tools and calculators. Since I’m still learning, the features are pretty basic, and I’m figuring things out as I go. The application lets users try out different financial strategies and see how their decisions might affect their money over time. It’s a work in progress, and I hope to improve it as I learn more!
## 
### Task Description
**Personal Finance Advisor**: Create a financial advisor application. Users can input their salary, preferred currency, and desired annual interest rate. The system calculates the maximum loan amount they can obtain, the repayment plan, and the total interest paid over the loan term.
##
### Summary
This loan simulation system that handles JWT authentication, works connected to a database, can be reconstructed with Docker and handles http requests through an api.
##
### Authentication
This system uses JWT authentication process with tokens.
#### Sign up
Send POST request to http://localhost:3000/auth/register  with the corresponded information in order to successfully sign up to the system. See the following example:

{
    "name":"Gonzalo",
    "lastName":"Varela Alagna",
    "email":"gvalagna@gmail.com",
    "password":"gvalagnA$4"
}

##### Example of response: 

{
      message: "User registered",
      user: {
        id: "u1",
        email: "gvalagna@example.con",
      },
    }

    
#### Sign in
Send POST request to http://localhost:3000/auth/login  with the corresponded information in order to successfully sign in to the system. See the following example:

{
  "email": "gvalagna@gmail.com",
  "password": "gvalagnA$4"
}


##### Example of response:


{ user, token } (upd)
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
nodemon: not found → Run npm install --save-dev nodemon

Cannot find module → Check import paths and file names

Docker not connecting to the database → Make sure depends_on is set in docker-compose.yml

####