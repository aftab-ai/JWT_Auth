# Backend

It is an example of backend api server for user 'authentication/authorization' with **Json Web Token**.

---

## Server Structure

```bash
  Backend/
  |
  |----config/
  |  |----cors.js
  |  |----index.js
  |  |----keys.js
  |----controllers/
  |  |----authControllers.js
  |  |----index.js
  |  |----notFound.js
  |----init/
  |  |----mongodb.js
  |----middlewares/
  |  |----authMiddleware.js
  |  |----authorizeRole.js
  |  |----errorHandler.js
  |  |----index.js
  |  |----rateLimiter.js
  |  |----validateCSRFtoken.js
  |  |----validateRefreshToken.js
  |  |----verifiedEmail.js
  |----models/
  |  |----ForgotPassword.js
  |  |----index.js
  |  |----PasswordReset.js
  |  |----Session.js
  |  |----User.js
  |----routes/
  |  |----authRoutes.js
  |  |----index.js
  |----utils/
  |  |----cookies/
  |  |  |----clearTokenCookie.js
  |  |  |----setAccessTokenCookie.js
  |  |  |----setRefreshTokenCookie.js
  |  |----password/
  |  |  |----compareHashPassword.js
  |  |  |----hashPassword.js
  |  |----randomCode/
  |  |  |----compareHashCode.js
  |  |  |----generateCode.js
  |  |  |----hashRandomCode.js
  |  |----sendEmail/
  |  |  |----sendEmail.js
  |  |----tokens/
  |  |  |----createAccessToken.js
  |  |  |----createCSRFToken.js
  |  |  |----createRefreshToken.js
  |  |  |----hashCSRFToken.js
  |  |  |----hashRefreshToken.js
  |  |----userDevice/
  |  |  |----parseDeviceName.js
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

- ### Authentication & Token Strategy:
  - **Authentication & Token Strategy** - Secure login using access and refresh tokens.
  - **AdvancedJ Session & Token Lifecycle** - Stores tokens in cookies inaccessible to JavaScript.
  - **Security & Attack Prevention** - Prevents cross-site request forgery via cookie isolation.
  - **Authorization & Validation** - 15-minute expiry to reduce exposure risk.
  - **Device & Session Intelligence** - 7-day lifespan with cryptographically generated 64-byte hex values.
  - **Backend Architecture** - Access token secrets securely managed via environment variables.

- ### Advanced Session & Token Lifecycle:
  - **Atomic Token Rotation** - Refreshing tokens rotates both access & refresh tokens securely.
  - **Refresh Conflict Detection** - Invalid or reused refresh tokens immediately invalidate the session (forced logout).
  - **Session Expiry Synchronization** - Session lifetime dynamically extends with token refresh.
  - **Session Limiting** - Maximum of 10 active sessions per user with automatic oldest-session eviction.
  - **Global Logout** - Allows users to terminate all active sessions across devices.
  - **TTL Indexing in Database** - Automatically removes expired sessions using database indexing.

- ### Security & Attack Prevention:
  - **CSRF Protection System** -
    - Cryptographically generated 32-byte CSRF tokens.
    - Stored hashed in database.
    - Sent via API and validated per session.
  - **Password Security** - Bcrypt hashing with salt rounds (12).
  - **Secure Password Reset Flow** -
    - Crypto-generated reset codes.
    - Hashed storage with 2-minute expiration.
  - **Email Verification System** - Token-based verification using short-lived secure codes.
  - **Rate Limiting** - IP-based protection against brute-force and abuse.
  - **CORS Whitelisting (Production-grade)** -
    - Dynamic origin validation.
    - Strict allowed headers and methods.
    - Credentials-enabled secure requests.
  - **Secure HTTP Headers** - Implemented via middleware to mitigate common vulnerabilities.
  - **Centralized Error Handling** - Custom error handler for consistent API responses.

- ### Authorization & Validation:
  - **Role-Based Access Control (RBAC)** - Restricts endpoints based on user roles.
  - **Request Validation** - Backend validation using express-validator.
  - **Consistent Input Validation** - Ensures data integrity across client and server.

- ### Device & Session Intelligence:
  - **Device Tracking per Session** -
    - Device model, type, vendor.
    - OS name and version.
    - Browser name and version.
  - **Session Awareness** - Enables advanced features like session monitoring and anomaly detection.

- ### Backend Architecture:
  - **RESTful API Design** - Structured and scalable route handling.
  - **Middleware-based Architecture** - Modular handling of auth, errors, validation, and security.
  - **Logging System** - Request logging for debugging and monitoring.
  - **Scalable Configuration** - Environment-based configs for dev and production.

---

## Installation

- Clone the repository

  `git clone https://github.com/aftab-ai/JWT_Auth`

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
  - **Signup Route** - New user registration.
    - POST `/api/v1/auth/signup`

      ```bash
      {
        "username": "user1",
        "email": "user1@gmail.com",
        "password": "Aabc@123"
      }
      ```

  - **Request Forgot Password Route** - Send OTP via email to reset the password.
    - POST `/api/v1/auth/request-forgot-password`

      ```bash
      {
        "email": "user1@gmail.com"
      }
      ```

  - **Verify Forgot Password Route** - Verify OTP and reset the password.
    - POST `/api/v1/auth/verify-forgot-password`

      ```bash
      {
        "email": "user1@gmail.com",
        "code": "890342",
        "newPassword": "AaBC@1234"
      }
      ```

  - **Signin Route** - User authentication.
    - POST `/api/v1/auth/signin`

      ```bash
      {
        "email": "user1@gmail.com",
        "password": "Aabc@123"
      }
      ```

  - **Current User** - Get current user info(userId, username, user-role).
    - GET `/api/v1/auth/current-user`

      ```bash
      Cookie - accessToken: JWT_Token
      ```

  - **CSRF Refresh** - Get new CSRF-Token.
    - POST `/api/v1/auth/csrf-refresh`

      ```bash
      Cookie - accessToken: JWT_Token
      ```

  - **Auth Refresh** - Refresh Tokens(Access-Token, Refresh-Token).
    - POST `/api/v1/auth/auth-refresh`

      ```bash
      Cookie - refreshToken: Refresh_Token
      ```

  - **Send Email Verification Code** - Send OTP via email.
    - POST `/api/v1/auth/send-email-verification-code`

      ```bash
      {
        "email": "user1@gmail.com"
      }

      Cookie - accessToken: JWT_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **User Verification Route** - Verify user with verification-code.
    - POST `/api/v1/auth/verify-email`

      ```bash
      {
        "email": "user1@gmail.com",
        "code": "123456"
      }

      Cookie - accessToken: JWT_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **Request Password-Reset Route** - Send OTP via email to reset the password.
    - POST `/api/v1/auth/request-password-reset"`

      ```bash
      {
        "oldPassword": "Aabc@123"
      }

      Cookie - accessToken: JWT_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **Verify User Password-Reset Route** - Verify user OTP and reset password with new.
    - POST `/api/v1/auth/verify-password-reset`

      ```bash
      {
        "code": "123456",
        "newPassword": "AAbc@135"
      }

      Cookie - accessToken: JWT_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **Logout Route** - User session over.
    - POST `/api/v1/auth/logout`

      ```bash
      Cookie - refreshToken: Refresh_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **Logout-All Route** - User logout from all session devices.
    - POST `/api/v1/auth/logout-all`

      ```bash
      Cookie - refreshToken: Refresh_Token
      Headers - x-csrf-token: CSRF_Token
      ```

  - **User-Deletion Route** - User account deletion route.
    - DELETE `/api/v1/auth/delete-user`

      ```bash
      {
        "password": "Aabc@123"
      }

      Cookie - accessToken: JWT_Token
      Headers - x-csrf-token: CSRF_Token
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
- **Json Web Token** - JSON web token (JWT), pronounced "jot", is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. Again, JWT is a standard, meaning that all JWTs are tokens, but not all tokens are JWTs.
- **Cookie-Parser** - Cookie Parser, parse Cookie header and populate req.cookies with an object keyed by the cookie names.
- **Crypto** - Crypto is a module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
- **UAParser.js** - UAParser.js is the most comprehensive, compact, and up-to-date JavaScript library to detect user's browser, OS, CPU, and device type/model. Also detect bots, apps, and more. Runs seamlessly in the browser (client-side) or Node.js (server-side).
- **Express-Rate-Limit** - express-rate-limit is a basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. Plays nice with express-slow-down and ratelimit-header-parser.
- **Nodemailer** - Nodemailer makes sending email from a Node.js application straightforward and secure, without pulling in a single runtime dependency.
- **Helmet** - Help secure Express apps by setting HTTP response headers.
- **CORS** - CORS is a Node.js middleware for Express/Connect that sets CORS response headers. These headers tell browsers which origins can read responses from your server.
