# Vite-Express-Template

**Vite-Express-Template** combines **Vite** for fast front-end development with **Express** for back-end API handling. It provides a full-stack setup where **Vite** manages the front-end development workflow with hot-reloading, while **Express** serves API routes and static files, ensuring a seamless development experience. This template includes **PostgreSQL** for the database and **Knex.js** as the query builder, simplifying database interactions.

The template also includes automated **testing** with:

-   **Jest** and **Supertest** for back-end API route testing.
-   **Jest** and **React Testing Library** for front-end component testing.

Additionally, it offers **Docker compatibility**, allowing for easy containerized deployment and development. Docker ensures a consistent environment for running the application, simplifying dependency management and deployment.

---

## 🚀 Run Locally

### 📌 Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (Recommended: v16+)
-   npm (comes with Node.js)
-   Git (to clone the repository)
-   [Docker](https://www.docker.com/)

### 🔹 Clone the repository

```sh
  git clone https://github.com/Adam-Brace/Vite-Express-Template
```

### 🔹 Navigate to the project directory

```sh
  cd Vite-Express-Template
```

### 🔹 Run the setup script and follow the prompts

```sh
  ./setup.sh
```

## Running with Node

### 🔹 Start the client

```sh
  npm run dev --prefix ./client
```

### 🔹 Open a new terminal and start the server

```sh
  npm run dev --prefix ./server
```

## Running with Docker

### 🔹 Start the application using Docker

```sh
  docker compose up --build
```

---

## Knex Migrations & Seeding

### Running Migrations & Seeds

Run `./knex.sh` to apply database migrations and seed data:

```sh
  ./knex.sh
```

This executes the following commands in order:

-   `npx knex migrate:rollback` → Rolls back the last migration batch
-   `npx knex migrate:latest` → Runs all pending migrations
-   `npx knex seed:run` → Populates the database with seed data

### Creating Migrations and Seeds

To generate new migration and seed files, run:

```sh
  ./knex.sh <migration_and_seed_name> [additional_migrations_and_seeds...]
```

For example:

```sh
  ./knex.sh roles users
```

This generates the following migration and seed files:

```sh
migrations/
├── 00_20250320193622_roles.js
├── 01_20250320193622_users.js

seeds/
├── 00_roles.js
├── 01_users.js
```

---

## 🛠 Common Issues

When running `./setup.sh`, you may encounter one of these errors:

**❌ Error:**

-   `./setup.sh: Permission denied`
-   `Unknown command. './setup.sh' exists but is not an executable file.`

**Solution:**
Run the following command to grant execute permissions to the setup script:

```sh
  chmod +x setup.sh
```

When running `./knex.sh`, you may encounter one of these errors:

**❌ Error:**

-   `./knex.sh: Permission denied`
-   `Unknown command. './knex.sh' exists but is not an executable file.`

**Solution:**
Run the following command to grant execute permissions to the knex script:

```sh
  chmod +x knex.sh
```

When running Docker with WSL, you may encounter the following error:

**❌ Error:**

`The command 'docker' could not be found in this WSL 2 distro. We recommend to activate the WSL integration in Docker Desktop settings. For details about using Docker Desktop with WSL 2, visit: https://docs.docker.com/go/wsl2/`

`We recommend to activate the WSL integration in Docker Desktop settings. For details about using Docker Desktop with WSL 2, visit: https://docs.docker.com/go/wsl2/`

**Solution:** Enable WSL Integration in Docker Desktop

-   Open Docker Desktop on Windows.
-   Go to Settings > Resources > WSL Integration.
-   Ensure your WSL 2 distribution (e.g., Ubuntu) is enabled.
-   Click Apply & Restart.

---

## ✅ Running Tests

To run tests, navigate to the appropriate directory (server or client) and run:

```sh
  npm run test
```

---

## 👤 Author

-   [Adam Brace](https://github.com/Adam-Brace)
