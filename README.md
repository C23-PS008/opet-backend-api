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

## Deployment Using GCP

1. Create a project.
2. Link a billing account.

### Create SQL Instance

1. In the navigation menu, select SQL.
2. Choose MySQL as the Database Engine.
3. Select MySQL 8.0 as the Database Version.
4. Set up and create the MySQL instance.

### Create Cloud Storage Bucket

1. In the navigation menu, select Cloud Storage.
2. Create and set up the bucket.
3. Uncheck "Enforce public access prevention on this bucket".
4. Choose "Fine-grained" as the Access control.
5. Click "Create".

### Create Service Account

1. Create a Service Account and assign the role of "Storage Object Creator".
2. Create a new key for the Service Account and select JSON as the key type.
3. Save the Service Account key file to Secret Manager.

### Deploy to Google App Engine

1. Activate Cloud Shell and clone this repository.
2. Run `npm install`.
3. Run `gcloud app deploy`. Type "Y" and press Enter to proceed with the deployment.

### Create Cloud Build for CI/CD

1. Connect this repository.
2. Create a trigger for when there is a push to a branch.
3. Add environment variables to connect to the SQL Instance.
