# 📱 Equivalent Social Media App (Express) — `equivalent-social-media-app-using-express`

📖 **Overview**  
A full-stack / backend-focused social-media-like application built with **Node.js / Express**. This repository contains the server-side code and modular app components (user, post, search) along with configuration for database migrations and shared utilities.

> **Repo:** `sakshamsinghania/equivalent-social-media-app-using-express`.  
> Primary language: **JavaScript**.

---

## ✨ Features
- User module (registration, authentication, profile handling) — located in `user_app/`.
- Post module (create, read, update, delete posts) — located in `post_app/`.
- Search feature (search posts/users) — `search_feature/`.
- Shared utilities and helpers placed under `shared/utils`.
- DB migration config for MongoDB migrations (`migrate-mongo-config.js` and `migrations/` folder).
- App entrypoints: `app.js` and `server.js`.
- Project configured via `package.json` (scripts & dependencies).

---

## 🚀 Quick Start (Install & Run locally)

> These commands assume you have Node.js (16+/18+) and MongoDB or a MongoDB Atlas URI.

1. **Clone (SSH)**  
   ```bash
   git clone git@github.com:sakshamsinghania/equivalent-social-media-app-using-express.git
   cd equivalent-social-media-app-using-express
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn
   ```

3. **Create `.env`** (example `.env` variables — fill with your values)
   ```text
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/social_app
   JWT_SECRET=your_jwt_secret_here
   ```

4. **Run database migrations (if using migrate-mongo)**  
   ```bash
   npx migrate-mongo up
   ```

5. **Start the server**
   ```bash
   npm run start
   # or for dev mode with nodemon
   npm run dev
   ```

6. **Open**: `http://localhost:3000` (or the port you configured)

---

## 🛠️ Usage & Examples

- **Register / Login**  
  ```
  POST /api/auth/register
  POST /api/auth/login
  ```

- **Posts**
  ```
  GET /api/posts
  POST /api/posts
  GET /api/posts/:id
  PATCH /api/posts/:id
  DELETE /api/posts/:id
  ```

- **Search**
  ```
  GET /api/search?q=your_query
  ```

---

## 📦 Technologies
- **Node.js** + **Express**
- **MongoDB**
- **JavaScript**
- Typical middlewares: `express.json()`, `cors`, `jsonwebtoken`, etc.

---

## 🔧 Configuration (env variables)
```env
PORT=3000
MONGO_URI=your_mongo_uri
JWT_SECRET=super-secret
SALT_ROUNDS=10
```

---

## ✅ Requirements
- Node.js (v16 or above recommended)
- npm or yarn
- MongoDB (local or Atlas)
- migrate-mongo (if using migrations)

---

## 🗂️ Repository Structure
```
/ (repo root)
├─ config/
├─ migrations/
├─ post_app/
├─ search_feature/
├─ shared/
│   └─ utils/
├─ user_app/
├─ .gitignore
├─ app.js
├─ migrate-mongo-config.js
├─ package.json
└─ server.js
```

---

## 🔗 Flow Chart
```
 [Client]  <--->  [Express server (app.js/server.js)]
                        |
        ---------------------------------------
        |                |                    |
   [user_app]        [post_app]         [search_feature]
        |                |                    |
    Users collection  Posts collection   Search index / DB queries
        \                |                    /
         \---------------+-------------------/
                        [shared/utils & config]
                               |
                           [MongoDB]
```

---

## 🤝 Contributing
1. Fork and branch (`feature/your-feature`)
2. Make changes, commit, and push
3. Open a Pull Request

---

## 📄 Documentation
See module folders for route definitions and logic.

---

## ❤️ Acknowledgements
- Built by **Saksham Singhania** (GitHub: `sakshamsinghania`).

---

## 📝 Changelog
- **Oct 26, 2025** — Initial commit / added project files.

---

## ✅ Repo metadata
- **Repository URL:** https://github.com/sakshamsinghania/equivalent-social-media-app-using-express  
- **Primary language:** JavaScript  
- **Branches:** main  
- **Issues:** 0 | **PRs:** 0 | **Releases:** 0  
- **Author:** Saksham Singhania

