# OPET BACK-END & CLOUD COMPUTING 
This repository contains RESTful API for users and pets management. The API integrates with Google Cloud using Cloud SQL for the database to store the users and pets data. Beside that, we also have configured it to the Google Cloud Storage to store pets image. This server has been deployed using App Engine.

## Google Cloud Infrstructure 
![Google Cloud Infrstructure](https://github.com/C23-PS008/opet-backend-api/assets/83505569/1ac135d1-0ff5-475e-8ddf-dd66a52789d2)

## Base URL
`https://backend-dot-capstone-opet.et.r.appspot.com`

## Requirements
Project is created with:
- Node.js (v16.17.0)
- NPM (8.15.0)
- Google Cloud SQL (MySQL 8.0)

## Endpoint Documentation
### Auth Endpoint
- Register : `POST` `/register`
- Login : `POST` `/login`

### Users Endpoint
- Get Logged User `GET` `/users/me`
- Update User Data `PUT` `/users/edit`

### Pets Endpoint
- Get All Pets with Pagination `GET` `/pets?type={{type}}&page={{page}}&size={{size}}`
- Get Pet Detail `GET` `/pets/{{id}}`
- Upload Pet Data `POST` `/mypets`
- Get Only Owner's Pets `GET` `/mypets`
- Update Owner's Pet `PUT` `/mypets/{{id}}`
- Delete Owner's Pet `DELETE` `/mypets/{{id}}`



