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
  |  |----api/
  |  |  |----auth.autoLogoutHandler.js
  |  |  |----auth.service.js
  |  |  |----axiosInstance.js
  |  |----assets/
  |  |  |----docs/
  |  |  |  |----backend/
  |  |  |  |  |----features/
  |  |  |  |  |  |----advancedSessionAndTokenLifecycle.js
  |  |  |  |  |  |----authenticationAndTokenStrategy.js
  |  |  |  |  |  |----authorizationAndValidation.js
  |  |  |  |  |  |----backendArchitecture.js
  |  |  |  |  |  |----deviceAndSessionIntelligence.js
  |  |  |  |  |  |----securityAndAttackPrevention.js
  |  |  |  |  |----technologies/
  |  |  |  |  |  |----backendTechnologies.js
  |  |  |  |----frontend/
  |  |  |  |  |----features/
  |  |  |  |  |  |----apiCommunication.js
  |  |  |  |  |  |----authenticationFlow.js
  |  |  |  |  |  |----formHandlingAndValidation.js
  |  |  |  |  |----technologies/
  |  |  |  |  |  |----frontendTechnologies.js
  |  |  |  |  |----keyHighlights.js
  |  |  |----fonts/
  |  |  |  |----Inter-Bold.woff2
  |  |  |  |----Inter-Medium.woff2
  |  |  |  |----Inter-Regular.woff2
  |  |  |  |----Inter-SemiBold.woff2
  |  |----components/
  |  |  |----docsComponents/
  |  |  |  |----AuthRefreshRoute.jsx
  |  |  |  |----CSRFRefreshRoute.jsx
  |  |  |  |----CurrentUserRoute.jsx
  |  |  |  |----EmailVerificationRoute.jsx
  |  |  |  |----ForgotPasswordRoute.jsx
  |  |  |  |----LoginRoute.jsx
  |  |  |  |----LogoutAllRoute.jsx
  |  |  |  |----LogoutRoute.jsx
  |  |  |  |----PasswordResetRoute.jsx
  |  |  |  |----SignupRoute.jsx
  |  |  |  |----UserDeletionRoute.jsx
  |  |  |----DeleteAccountModel.jsx
  |  |  |----ListComponent.jsx
  |  |  |----Loader.jsx
  |  |  |----PrivateNavbar.jsx
  |  |  |----PublicNavbar.jsx
  |  |----context/
  |  |  |----AuthProvider.jsx
  |  |  |----context.js
  |  |----hooks/
  |  |  |----useAuth.js
  |  |----pages/
  |  |  |----profile/
  |  |  |  |----Profile.jsx
  |  |  |  |----ProfileLayout.jsx
  |  |  |  |----ResetPassword.jsx
  |  |  |  |----VerifyEmail.jsx
  |  |  |----Docs.jsx
  |  |  |----ForgotPassword.jsx
  |  |  |----Home.jsx
  |  |  |----Landing.jsx
  |  |  |----Login.jsx
  |  |  |----NotFound.jsx
  |  |  |----Signup.jsx
  |  |----routes/
  |  |  |----layouts/
  |  |  |  |----PrivateLayout.jsx
  |  |  |  |----PublicLayout.jsx
  |  |  |----router.jsx
  |  |----validators/
  |  |  |----emailValidators.js
  |  |  |----emailVerificationSchemaValidators.js
  |  |  |----forgotPasswordSchemaValidators.js
  |  |  |----loginSchemaValidators.js
  |  |  |----resetPasswordSchemaValidators.js
  |  |  |----signupSchemaValidators.js
  |  |  |----userDeletionSchemaValidators.js
  |  |  |----verifyForgotPasswordSchemaValidators.js
  |  |  |----verifyResetPasswordSchemaValidators.js
  |  |----App.jsx
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
- **React-DOM** - React DOM is a package that provides the necessary methods to connect and interact with the browser's Document Object Model (DOM) using the core React library.
- **Tailwind-CSS** - Rapidly build modern websites without ever leaving your HTML.
- **React-Router-DOM** - A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere.
- **React-Hook-Form** - React Hook Form reduces the amount of code you need to write while removing unnecessary re-renders.
- **Zod** - Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.
- **React-Hook-Form-Resolvers(@hookform/resolvers)** - This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others.
- **Lucide-React** - Lucide icon library for React applications.
- **Axios** - Promise based HTTP client for the browser and node.js.
- **React-Toastify** - React-Toastify allows you to add notifications to your app with ease.
