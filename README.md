# Matrix URL Shortener

A high-performance, container-ready URL shortening service featuring a custom Matrix digital rain UI. Built with **Node.js**, **Express**, **EJS**, and **MongoDB**.

**Live Demo**: [https://url-shortner-mgyu.onrender.com](https://url-shortner-mgyu.onrender.com)

---

## 🛠️ Architecture & Design Decisions

- **Collision-Resistant Short Codes**: Short URLs are generated using Node's native `crypto` module (`randomBytes(4)`), producing secure, URL-safe 8-character hexadecimal tokens that balance brevity and database collision resistance.
- **Dynamic Host Resolution**: Leverages reverse-proxy headers (`req.headers.host` combined with trust proxy middleware) to dynamically adapt redirect links between local development and cloud production (e.g. Render, AWS, Heroku) without code modifications.
- **Matrix UI Aesthetic**: Implements responsive, centered card layouts and a dark/neon digital rain theme layered gracefully over Bootstrap 5.

---

## ⚡ Tech Stack

- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Templating Engine**: EJS (Embedded JavaScript)
- **Database Layer**: MongoDB & Mongoose ORM
- **Styling**: Custom CSS + Bootstrap 5 CDN

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally or a MongoDB Atlas URI

### 1. Installation
Clone the repository and install the production/development dependencies:
```bash
git clone https://github.com/Sk-Akram-Ahmed/Url-shortner.git
cd Url-shortner
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory to store your environment variables:
```ini
# MongoDB connection connection string
MONGODB_URI=mongodb://127.0.0.1:27017/url

# Application Port
PORT=3000
```

### 3. Running Locally
Run the service in development mode:
```bash
# Using standard Node
npm start

# Using nodemon (if installed globally/locally)
npx nodemon index.js
```
The server will start at `http://localhost:3000`.

---

## 📡 API Specification

### 1. Render Homepage
- **Endpoint**: `GET /home` (or root `GET /` redirects here)
- **Description**: Returns the UI interface containing the URL shortening input form.

### 2. Shorten URL
- **Endpoint**: `POST /shorten`
- **Payload**:
  ```json
  {
    "url": "https://example.com/very/long/destination/url"
  }
  ```
- **Description**: Checks for existing shortened mappings. If none exist, generates a new short code, persists the mapping in MongoDB, and renders the result view displaying the shortened URL.

### 3. URL Redirection
- **Endpoint**: `GET /:shortCode`
- **Description**: Performs a lookup of the short code in the database and sends a `302 Found` HTTP redirect to the destination URL.

---

## ☁️ Production Deployment

When deploying to platforms behind reverse-proxies (like **Render**, **Heroku**, or **AWS ELB**):
1. **Trust Proxy Configuration**: The application is configured with `app.set('trust proxy', true)` to accurately resolve `https://` schemas when generating short URLs.
2. **Environment variables**: Ensure you add your production MongoDB URI (e.g., MongoDB Atlas connection string) as `MONGODB_URI` in your hosting provider's dashboard.
