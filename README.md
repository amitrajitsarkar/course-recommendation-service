# AI Course Recommendation API

An Express.js and MongoDB based backend that provides AI-powered course recommendations based on a student's interests and career goals. The system also supports mentor authentication and course management.

---

## Features

### Student

* Sign Up
* Login
* JWT Authentication
* Store interests and career goal
* Get AI-powered course recommendations

### Mentor

* Sign Up
* Login
* Create courses
* Update own courses
* Delete own courses

### AI Recommendation

* Uses Google Gemini API
* Recommends the most suitable courses based on:

  * Student interests
  * Student goal
  * Available courses

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Cookie Parser
* Google Gemini API

---

## Project Structure

```
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js
```

---

## Database Models

### User

* username
* password
* role
* interests
* goal

### Mentor

* username
* password
* expertise
* bio

### Course

* title
* category
* description
* mentor

---

## Authentication

* Students and mentors have separate authentication.
* Passwords are hashed using bcrypt.
* JWT is stored in an HttpOnly cookie.

---

## API Endpoints
### Student

```text
POST   /api/auth/register          # Register a new student
POST   /api/auth/login             # Login as a student
DELETE /api/auth/delete            # Delete a student account
```

### Mentor

```text
POST   /api/mentors/signup         # Register a new mentor
POST   /api/mentors/login          # Login as a mentor

GET    /api/mentors/all            # Get all mentors
GET    /api/mentors/:username      # Get mentor details by username
PATCH  /api/mentors/:id            # Update mentor profile
DELETE /api/mentors/delete/mentors # Delete a mentor
```

### Courses

```text
GET    /api/courses/all            # Get all available courses
GET    /api/courses/:id            # Get a specific course by ID

POST   /api/courses/create         # Create a new course (Mentors only)
PATCH  /api/courses/:id            # Update an existing course (Course owner only)
DELETE /api/courses/delete/:id     # Delete a course (Course owner only)
```

### AI Recommendation

```text
POST   /api/student/recommendations  # Get AI-powered course recommendations based on the student's interests and career goal
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

SALT=12

GEMINI_API_KEY=your_gemini_api_key
```

---

## Installation

```bash
git clone https://github.com/amitrajitsarkar/course-recommendation-service

cd course-recommendation-api/server

npm install

npm run dev
```

---

## Future Improvements

* Course enrollment
* Mentor ratings and reviews
* Course search and filtering
* AI-generated learning roadmap
* Admin dashboard
* Frontend using React
