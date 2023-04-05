# CSV to JSON Convertor

This app contains an API which takes a csv from the location defined in config file and upload the either on MongoDB or Postgresql.

## Prerequisite
Setup MongoDB or Postgres as per information given in config file in project.

Note: This is development server, production will move all details to secret.

## Setup
```bash
git clone <app>
cd <app>
npm i
npm start
```

## Usage
Once app is running, hit the GET API on <host>:<port>/api 

You can check DB collection for DB entry and check console for User Distribution Data