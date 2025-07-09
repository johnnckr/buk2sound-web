# Project Title

This project is a backend application built with Node.js and Express. It serves as the backend for a web application that manages users, courses, products, and various related functionalities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage

To start the server, run:
```
node server.js
```
The server will start on the specified port (default is 3000).

## Environment Variables

The application requires the following environment variables to be set in the `.env` file:

- `PORT`: The port on which the server will run.
- `DB_HOST`: The database host.
- `DB_USER`: The database user.
- `DB_PASS`: The database password.
- `DB_NAME`: The name of the database.
- `JWT_SECRET`: The secret key for JWT authentication.
- `SMTP_HOST`: The SMTP server for sending emails.
- `SMTP_PORT`: The port for the SMTP server.
- `SMTP_USER`: The SMTP user.
- `SMTP_PASS`: The SMTP password.

## Routes

The application provides the following routes:

- **Authentication**
  - `/auth/login`: Login a user.
  - `/auth/register`: Register a new user.

- **Users**
  - `/users`: Manage user data.

- **Courses**
  - `/courses`: Manage courses.

- **Lessons**
  - `/lessons`: Manage lessons within courses.

- **Enrollments**
  - `/enrollments`: Handle course enrollments.

- **Products**
  - `/products`: Manage products.

- **Orders**
  - `/orders`: Handle orders.

- **Categories**
  - `/categories`: Manage categories.

- **Addresses**
  - `/addresses`: Manage user addresses.

- **Payments**
  - `/payments`: Handle payment processing.

- **Dashboard**
  - `/dashboard`: Retrieve dashboard-related data.

- **File Uploads**
  - `/upload`: Handle file uploads.

## Database

The database schema and initial data can be set up using the SQL scripts provided in `db.sql`. Make sure to run the SQL commands to create the necessary tables and seed data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.