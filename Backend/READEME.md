# Backend

It is backend api server for user 'authentication/authorization' with **Json Web Token**.

---

## Server Structure

```bash
  Backend/
  |
  |----config/
  |  |----keys.js
  |----controllers/
  |  |----authControllers.js
  |  |----index.js
  |  |----notFound.js
  |----init/
  |  |----mongodb.js
  |----middlewares/
  |  |----errorHandler.js
  |  |----index.js
  |----models/
  |  |----User.js
  |----routes/
  |  |----authRoutes.js
  |  |----index.js
  |----utils/
  |  |----hashPassword.js
  |----validators/
  |  |----authValidators.js
  |  |----validate.js
  |----.env.example
  |----.gitignore
  |----app.js
  |----index.js
  |----package-lock.json
  |----package.json
  |----READEME.md
```

---

## Features

- Multi-User (Authentication/Authorization)
- Access-Token
- Hashed Refresh-Token

---

## Installation

- Clone the repository

  `git clone https://github.com/aftab-ai/JWT_Exe`

- Navigate into the folder

  `cd project-name`

- Install Dependencies

  `npm i install`

- Add your Environmet variables

  `read example.env`

- Start the API server

  `node index.js`

---

## Usage

- ### Auth Routes

  - **SignUp Route** - New user registration.

    - POST `/api/v1/auth/signUp`

      ```bash
      {
        "username": "user1",
        "email": "user1@gmail.com",
        "password": "12345678"
      }
      ```

---

## Technologies Used

- **Node.js** - Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- **Express** - Express is a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile application.
- **Environment Variables** - ENV are user-defined, key-value pairs that store dynamic values which affect the behavior of a computer's processes and applications.
- **Mongoose** - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- **Bcrypt.js** - Bcrypt is a hashing algorithm to create hashes for passwords to store them in case of a data breach. This advanced hashing algorithm uses salts, making it hard to crack by attacks such as brute-forcing.
- **Morgan** - HTTP request logger middleware for node.js.
- **Express-Validator** - Express-validator is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.
