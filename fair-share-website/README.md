## Signup/Login Page Usage

- **Sign Up Page:** Access the signup page at [http://localhost:3000/signup](http://localhost:3000/signup). Provide a name, email, and password to create a new user account.

- **Login Page:** Access the login page at [http://localhost:3000/login](http://localhost:3000/login). Provide your email and password to sign in.

- **Google Sign-In:** On the login page, you can also use Google sign-in to authenticate with your Google account.

- **Authentication State:** The `AuthContext` provider(`AuthProvider.tsx`) manages the user's authentication state and provides functions for user management, including creating, signing in, and logging out.

### Functionality in controller.ts

- All the functions responsible for Firestore interaction can be found in the `controller.ts` file.

- When a user signs up for the first time, their information is used to create a new user account. If the provided email is not already registered, a new user account is created, and the user is redirected to the desired page within the application.

- A new user document is added to the "user" collection in Firestore, including details such as the user's email and the timestamp of account creation.

- If the provided email already exists in Firestore, it skip the adding collection.


