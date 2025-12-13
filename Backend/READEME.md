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
  |  |----refreshControllers.js
  |----init/
  |  |----mongodb.js
  |----middlewares/
  |  |----errorHandler.js
  |  |----index.js
  |  |----loginLimiter.js
  |  |----refreshLimiter.js
  |  |----validateCSRFtoken.js
  |  |----validateRefreshToken.js
  |----models/
  |  |----User.js
  |----routes/
  |  |----authRoutes.js
  |  |----index.js
  |  |----refreshRoutes.js
  |----utils/
  |  |----cookies/
  |  |  |----setAccessTokenCookie.js
  |  |  |----setRefreshTokenCookie.js
  |  |----device/
  |  |  |----parseDeviceName.js
  |  |----password/
  |  |  |----comparePassword.js
  |  |  |----hashPassword.js
  |  |----tokens/
  |  |  |----createAccessToken.js
  |  |  |----createCSRFtoken.js
  |  |  |----createRefreshToken.js
  |  |  |----hashCSRFtoken.js
  |  |  |----hashRefreshToken.js
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
- Credentials Validation
- JWT Access-Token sent via httpOnly cookie
- Refresh-Token sent via httpOnly cookie
- Hash Refresh-Token saved with user session
- Hash CSRF-Token

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

  - **SignIn Route** - User authentication.

    - POST `/api/v1/auth/signIn`

      ```bash
      {
        "email": "user1@gmail.com",
        "password": "12345678"
      }
      ```

  - **Logout Route** - User session over.

    - POST `/api/v1/auth/logout`

- ### Refresh Routes

  - **Token Refresh** - Refresh Tokens(Access-Token, CSRF-Token, Refresh-Token).

    - POST `/api/v1/refresh-token`

---

## Technologies Used

- **Node.js** - Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- **Express** - Express is a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile application.
- **Environment Variables** - ENV are user-defined, key-value pairs that store dynamic values which affect the behavior of a computer's processes and applications.
- **Mongoose** - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- **Bcrypt.js** - Bcrypt is a hashing algorithm to create hashes for passwords to store them in case of a data breach. This advanced hashing algorithm uses salts, making it hard to crack by attacks such as brute-forcing.
- **Morgan** - HTTP request logger middleware for node.js.
- **Express-Validator** - Express-validator is a set of express.js middlewares that wraps the extensive collection of validators and sanitizers offered by validator.js.
- **Json Web Token** - JSON web token (JWT), pronounced "jot", is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Again, JWT is a standard, meaning that all JWTs are tokens, but not all tokens are JWTs.
- **Cookie-Parser** - Cookie Parser, parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- **Crypto** - Crypto is a module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
- **UAParser.js** - UAParser.js is the most comprehensive, compact, and up-to-date JavaScript library to detect user's browser, OS, CPU, and device type/model. Also detect bots, apps, and more. Runs seamlessly in the browser (client-side) or Node.js (server-side).
- **Express-Rate-Limit** - express-rate-limit is a basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with express-slow-down and ratelimit-header-parser.
