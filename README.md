# Project Management Backend (Node.js)

This repository contains the backend application for a Project Management system built using Node.js.

## Features

- **Authentication:** User authentication using JWT tokens.
- **Hashing:** Password encryption using bcrypt.
- **Validation:** Input validation and handling.
- **Project Management:** CRUD operations for managing projects.
- **Task Management:** CRUD operations for managing tasks within projects.
- **User Management:** CRUD operations for managing users.
- **Role-based Access Control:** Different roles (admin, project manager, team member) with varying permissions.
- **Data Persistence:** MySQL and Sequelize integration for storing project and user data.

## Technologies Used

- Node.js
- Express.js
- Sequelize
- MySQL
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- node-input-validator
- dotenv for environment variables
- multer

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- Sequelize
- MySQL

## Installation

To run this application locally, you need to have Node.js, Sequelize and MySQL installed on your machine.

1. Clone this repository:
   ```bash
   git clone https://github.com/satyansh-mittal/ProjectManagement-NodeJS.git
   ```

2. Install dependencies:
   ```bash
   cd ProjectManagement-NodeJS
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=3000
   TOKEN_HEADER_KEY='Authorization'
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```
   npm start
   ```
  The server should now be running at `http://localhost:3000`.

5. Ensure that the MySQL server is running and that the database specified in your /utils/index file is accessible or create a new database in MySQL.


## API Endpoints

### Admin Routes

1. **POST /admin/signUp:** Create a new admin user.
2. **GET /admin/login:** Admin user login.
3. **GET /admin/users:** Retrieve all users (admin endpoint).
4. **POST /admin/addUser:** Add a new user (requires authentication).
5. **GET /admin/projects:** Retrieve all projects (admin endpoint).
6. **POST /admin/addProject:** Add a new project (requires authentication).
7. **POST /admin/assignProjects:** Assign projects to users (requires authentication).
8. **GET /admin/progress:** Get project progress (requires authentication).

### User Routes

9. **GET /user/login:** User login.
10. **GET /user/profile:** Retrieve user profile (requires authentication).
11. **PATCH /user/edit:** Edit user profile (upload profile picture, requires authentication).
12. **GET /user/Projects:** Retrieve projects for a user (requires authentication).
13. **POST /user/addProgress:** Add progress to a project (requires authentication).


## Contributing
  Contributions are welcome! Fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
```vbnet
Feel free to customize it further based on specific functionalities or additional information you want to highlight about your project.
```

