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
| [Relationships](./documentation/RELATIONSHIP-README.md#data-modeling) | 
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
POST method should be executed with the corresponded information in order to successfully sign up to the system. Example below:
#### Sign in
POST method should be executed with the corresponded information in order to successfully sign in to the system. Example below:
