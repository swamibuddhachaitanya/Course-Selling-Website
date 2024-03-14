
---

# Course Selling Website Backend

This repository contains the backend implementation of a course selling website. The backend is developed using Node.js and Express, with MongoDB as the database.

## Description

The backend of the course selling website supports two types of users: admins and regular users. Admins have the authority to manage courses, while users can view and purchase courses.

## Features

- Authentication for admins and users.
- Admins can create and manage courses.
- Users can view available courses and purchase them.

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd course-selling-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   - Ensure you have MongoDB installed and running.
   - Update the MongoDB connection URL in `db/index.js` to point to your MongoDB instance.

4. **Start the server:**
   ```bash
   npm start
   ```

5. **API Documentation:**
   - View the API documentation in the `routes` directory for available routes and endpoints.

## Routes

### Admin Routes:

- `POST /admin/signup`: Creates a new admin account.
- `POST /admin/signin`: Logs in an admin account.
- `POST /admin/courses`: Creates a new course.
- `GET /admin/courses`: Returns all courses.

### User Routes:

- `POST /users/signup`: Creates a new user account.
- `POST /users/signin`: Logs in a user account.
- `GET /users/courses`: Lists all courses.
- `POST /users/courses/:courseId`: Purchases a course.
- `GET /users/purchasedCourses`: Lists purchased courses.

## Technologies Used

- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT) for authentication

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the [MIT License](LICENSE).

---
