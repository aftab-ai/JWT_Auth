# Frontend

It is an example cliant side programming structure for user 'authentication/authorization' for **Json Web Token** with **Vite + React, React-Router-DOM, Tailwind-CSS**.

---

## Server Structure

```bash
  Frontend/
  |
  |----public/
  |  |----jwt.svg
  |  |----shattered-dark.png
  |----src/
  |  |----app/
  |  |  |----router.jsx
  |  |----assets/
  |  |  |----fonts/
  |  |  |  |----Inter-Bold.woff2
  |  |  |  |----Inter-Medium.woff2
  |  |  |  |----Inter-Regular.woff2
  |  |  |  |----Inter-SemiBold.woff2
  |  |----components/
  |  |  |----layouts/
  |  |  |  |----PrivateLayout.jsx
  |  |  |  |----PublicLayout.jsx
  |  |  |----Loader.jsx
  |  |  |----PrivateNavbar.jsx
  |  |  |----PublicNavbar.jsx
  |  |----pages/
  |  |  |----ForgotPassword.jsx
  |  |  |----Home.jsx
  |  |  |----Landing.jsx
  |  |  |----Login.jsx
  |  |  |----NotFound.jsx
  |  |  |----Signup.jsx
  |  |----validators/
  |  |  |----signupSchemaValidators.js
  |  |----index.css
  |  |----main.jsx
  |----.gitignore
  |----eslint.config.js
  |----index.html
  |----package-lock.json
  |----package.json
  |----README.md
  |----vite.config.js
```

---

## Installation

- Clone the repository

  `git clone https://github.com/aftab-ai/JWT_Auth`

- Navigate into the folder

  `cd project-name`

- Install Dependencies

  `npm i install`

- Start the API server

  `npm run dev`

---

## Technologies Used

- **Vite** - Vite is a blazing fast frontend build tool powering the next generation of web applications.
- **React** - The library for web and native user interfaces.
- **Tailwind CSS** - Rapidly build modern websites without ever leaving your HTML.
- **React Router DOM** - A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere.
- **React Hook Form** - React Hook Form reduces the amount of code you need to write while removing unnecessary re-renders.
- **Zod** - Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.
- **React Hook Form Resolvers(@hookform/resolvers)** - This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others.
- **Lucide React** - Lucide icon library for React applications.
