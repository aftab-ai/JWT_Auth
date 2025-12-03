# Backend

It is backend api server for user 'authentication/authorization' with **Json Web Token**.

---

## Server Structure

```bash
  Backend/
  |
  |----config/
  |  |----keys.js
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

## Technologies Used

- **Node.js** - Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.
- **Express** - Express is a fast, unopinionated, minimalist web framework for Node.js, providing a robust set of features for web and mobile application.
- **Environment Variables** - ENV are user-defined, key-value pairs that store dynamic values which affect the behavior of a computer's processes and applications.
