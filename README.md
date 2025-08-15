# financial-advisor-
Internship in Solvd. company's LABA program for NodeJS backend development.


# Metro API #

## Table of Contents ##

- [Overview](#overview)
- [Setup](#setup)
- [Summary](#summary-of-the-relationship-between-objects)
- [Authentication](./documentation/AUTH-README.md#authentication)
    - [Register](./documentation/AUTH-README.md#register)
    - [Login](./documentation/AUTH-README.md#login)
- [Relationships](./documentation/RELATIONSHIP-README.md#data-modeling)
  - [Entity Relationship Diagram](./documentation/RELATIONSHIP-README.md#entity-relationship-diagram)
  - [Detailed Table Information](./documentation/RELATIONSHIP-README.md#detailed-table-information)
    - [Employee](./documentation/RELATIONSHIP-README.md#employee)
    - [Trains](./documentation/RELATIONSHIP-README.md#trains)
    - [Lines](./documentation/RELATIONSHIP-README.md#lines)
    - [Stations](./documentation/RELATIONSHIP-README.md#stations)
    - [Schedule](./documentation/RELATIONSHIP-README.md#schedule)
    - [Junction Tables](./documentation/RELATIONSHIP-README.md#junction-tables)
      - [Stations_Line](./documentation/RELATIONSHIP-README.md#stationsline)
      - [Trains_Schedule](./documentation/RELATIONSHIP-README.md#trainsschedule)
    - [Relationships Explained](./documentation/RELATIONSHIP-README.md#relationships-explained)

## Overview

This API is part of the LABA internship from Solvd. 

It allows you to manage resources for a metro managing company, including employees, trains, schedules and
stations.

Present limitations: 
- The API is not deployed anywhere, so you will have to run it locally. 
- Management of **trains**, **schedules** and **stations** is a work in progress.

## Setup

1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Clone this repository.
3. Run `docker-compose up`.
4. Access the API through `http://localhost:3000`.

In case you want to run tests, you can do so by running `npm run test`.

## Summary of the relationship between objects

- `Line` contains a list of `Stations` that it stops at.
- `Train` runs on a specific `Line` and follows a `Schedule`. 
- `Schedule` specifies the times that a `Train` arrives at and departs from each `Station` on its `Line`.
- `Employee` can be assigned to work on a specific `Train` or at a specific `Station`.
  
The relationships are as follows:

Station -> Line (many-to-many)

Train -> Line (one-to-many)
Line -> Train (many-to-one)

Train -> Schedule (one-to-one)
Schedule -> Train (one-to-one)
Schedule -> Station (one-to-many)
Station -> Schedule (many-to-one)
Employee -> Station (one-to-one)
Station -> Employee (one-to-one)
Employee -> Train (one-to-one)
Train -> Employee (one-to-one)
