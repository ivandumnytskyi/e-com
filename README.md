# E-commerce Demo

A small e-commerce web app built with Next.js. Visitors can browse products, search and sort the catalog, and sign in to try features such as likes, a shopping cart, and order history.

## Features

- Product catalog with search and sorting
- Product details and customer reviews
- Google sign-in
- Shopping cart and order history
- Liked products
- Optional demo sign-in with separate demo accounts

Demo accounts expire after 30 days. Demo checkout creates orders but does not reduce product stock.

## Built With

- Next.js, React, and TypeScript
- Tailwind CSS
- Prisma ORM and PostgreSQL
- Neon for the hosted database
- Auth.js for sign-in

## Requirements

- Node.js 22 or later
- npm
- A PostgreSQL database, such as a Neon development branch
- Google OAuth credentials for Google sign-in

## Local Setup

1. Install dependencies:

  ```bash
   npm ci
  ```

2. Create .env from the example:

  ```bash
   cp docker.env.example .env
  ```

3. Add your database and Auth.js values to .env:

    DATABASE_URL="your Neon pooled connection string"
    DIRECT_URL="your Neon direct connection string"
    AUTH_SECRET="your generated secret"
    AUTH_GOOGLE_ID="your Google OAuth client ID"
    AUTH_GOOGLE_SECRET="your Google OAuth client secret"
    DEMO_LOGIN_ENABLED="false"

4. Apply database migrations:

    ```bash
    npx prisma migrate deploy
    ```

5. Optionally load the sample catalog:

  ```bash
    npx prisma db seed
  ```

6. Start the development server:

  ```bash
    npm run dev
  ```


Open http://localhost:3000.

For Google sign-in locally, add http://localhost:3000/api/auth/callback/google to the authorized redirect URIs in your Google OAuth client.

## Demo Sign-In
Set DEMO_LOGIN_ENABLED="true" to show the demo sign-in button. Each click creates a separate demo user, so visitors do not share carts or liked products.

Demo users expire after 30 days. To remove expired users and their associated data, run this command periodically:

  ```bash
    npm run demo:cleanup
  ```

Only enable demo sign-in against an isolated demo database. Do not enable it against a production database.

## Docker
Docker Compose runs the Next.js app and a one-time migration service. The database remains in Neon; Compose does not create a local database.

1. Fill in .env as described above.

2. Use a Neon development branch in DATABASE_URL and DIRECT_URL.

3. Start the containers:

  ```bash
    docker compose up --build
  ```

4. Open http://localhost:3000.

Compose applies pending migrations before starting the app. Stop the containers with:

  ```bash
    docker compose down
  ```

## Useful Commands
```bash
npm run dev
npm run build
npm run start
npm run lint
npx prisma migrate dev --name describe-your-change
npx prisma migrate deploy
npm run demo:cleanup
```