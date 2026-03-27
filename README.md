Smart URL Shortener

A full-stack URL shortener built with modern backend architecture, featuring Redis caching, real-time analytics, and a live system monitoring dashboard.

⸻

Overview

Smart URL Shortener allows users to create short links and track their performance while ensuring high-speed redirects and system reliability.

This project goes beyond a basic CRUD application by including:
	•	Performance optimization with Redis
	•	System observability through health monitoring
	•	Analytics endpoints for tracking usage

⸻

Features

URL Shortening
	•	Generate unique short links
	•	Store URLs using MySQL via Sequelize ORM

Fast Redirects (Redis Caching)
	•	Frequently accessed URLs are cached
	•	Reduces database queries
	•	Improves response speed

Analytics
	•	Track usage of shortened URLs
	•	Endpoint for retrieving click insights

System Status Monitoring
	•	Live API health check
	•	Database connectivity status
	•	Redis availability check
	•	Response time measurement
	•	Memory usage tracking
	•	Server uptime

⸻

Tech Stack

Frontend
	•	Next.js
	•	Tailwind CSS
	•	Axios

Backend
	•	Express.js
	•	Sequelize
	•	Redis

Database
	•	MySQL
  
Project Structure
client/
  ├── app/
  ├── components/
  │   └── ApiStatusCard.jsx
  └── pages/

server/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── config/
  └── utils/

  Setup and Installation
  1. Clone the repository
  git clone https://github.com/your-username/url-shortener.git
cd url-shortener

2. Install dependencies
cd server
npm install

cd client
npm install

3. Environment variables
PORT=2000

DATABASE_URL=mysql://root:password@localhost:3306/url_shortener

REDIS_URL=redis://localhost:6379

4. Run the project

Start backend
npm run dev

Start frontend
npm run dev


API Endpoints

http://localhost:2000/api

**Dashboard

The frontend includes a live system monitoring card that displays:
	•	System health (UP/DOWN)
	•	Response time
	•	Memory usage
	•	Database and Redis status
	•	Uptime

⸻

Future Improvements
	•	Analytics charts (click trends over time)
	•	Geo-location tracking
	•	User authentication (JWT)
	•	Rate limiting per user
	•	Deployment (Vercel and Render)
	•	Redis cache hit/miss tracking

⸻
**
