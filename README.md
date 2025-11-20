# 🐾 RareKind – Backend API

RareKind is a backend **Express.js** API that powers a platform where users can showcase their exotic animals and browse collections created by others.  
This repository pairs with the [**RareKind Frontend**](https://github.com/technative-academy/rarekind-frontend). **API documentation** is available [here](https://rarekind-backend-production.up.railway.app/api-docs/).

The backend is deployed on **Railway**, uses **MySQL**, and integrates **Cloudinary** for image hosting.

---

## 📝 Overview

RareKind provides a complete API for:

- User authentication
- Creating and managing collections
- Adding animals into collections
- Retrieving collections including full animal objects
- Image upload support via Cloudinary

The database schema was collaboratively designed using
**dbdiagram.io**
<img width="924" height="398" alt="image" src="https://github.com/user-attachments/assets/0d4dd353-ebed-47b1-8d29-f1dd5782ef00" />

and visualised using **MySQL Workbench**.
<img width="1057" height="446" alt="image" src="https://github.com/user-attachments/assets/c328edbc-7094-44b8-a2d4-d46390b143b8" />

---

## 🖥️ Features

### 👤 Authentication

- User registration
- Login with JWT
- Hashed passwords (bcrypt)

### 📁 Collections

- Full CRUD operations
- Each collection automatically includes its animals

### 🐍 Animals

- Add animals to a collection
- Retrieve all animals in a specific collection
- Includes classification, description, and Cloudinary image URLs
- Frontend receives full objects

### 🌐 Project Workflow

- MySQL database hosted on Railway
- Backend deployed via Railway
- Schema drafted in dbdiagram.io
- Database visualised in MySQL Workbench

---

## 🎨 Architecture

RareKind follows a clean and scalable Express.js structure:

- **Models** — handle SQL queries
- **Controllers** — business logic
- **Routes** — API endpoints
- **Middleware** — JWT validation, error handling
- **Cloudinary integration** — secure image uploads

---

## ⚙️ Technologies Used

### Backend Core

- Node.js
- Express.js
- mysql2
- dotenv
- cors
- cookie-parser

### Authentication & Security

- jsonwebtoken
- bcryptjs

### Media Handling

- Cloudinary

### Additional Notes

- MySQL

---

## 🗄️ Database Design

### Tools Used

- dbdiagram.io
- MySQL Workbench

### Tables

- users
- collections
- animals
- classifications
- classification_animal

### SQL for creating the database

- [Script]()

---

## 🚀 Deployment

RareKind is deployed on Railway, featuring:

- Backend service
- MySQL production database
- Automatic builds and deploys
- Secure environment variables

---

## 🤝 Authors

### Backend

- [Yash Magane](https://github.com/YashMagane)
- [Yorick Brown](https://github.com/yodiyo)

### Frontend

- [Louise Aldridge](https://github.com/louiseka)
- [Matt Nightingale](https://github.com/MattNightingale)
