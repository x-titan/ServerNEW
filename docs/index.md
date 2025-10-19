# 🧭 Project Documentation Index

Welcome to the internal developer documentation for this project.  
This documentation is intended for **developers** — not end users — and describes the internal architecture, conventions, and design principles of the codebase.

---

## 📚 Documentation Structure

### 🧱 1. [architecture.md](./architecture.md)

> **Overview of the system structure and main layers.**  
> Explains how the project is organized, the flow of data between modules, and the responsibilities of each layer (`routes`, `service`, `repository`, `model`, etc.).  
> Also includes diagrams and examples of how requests move through the stack.

---

### ⚙️ 2. [core-concepts.md](./core-concepts.md)

> **Core development principles and patterns.**  
> Describes how validation, middleware, database access, and error handling are implemented.  
> Includes code style conventions and standard utility usage.

---

### 👥 3. [modules.md](./modules.md)

> **Module-by-module overview.**  
> Each module (e.g. `users`, `urls`) is documented with its purpose, main files, and flow.  
> Use this file to understand what each directory in `/src` does.

---

### 🔐 4. [auth.md](./auth.md)

> **Authentication and authorization details.**  
> Describes how JWT tokens, password hashing, and session validation are implemented.  
> Includes examples for token generation and verification.

---

### 🧩 5. [configuration.md](./configuration.md)

> **Configuration and environment variables.**  
> Lists all `.env` variables, their meanings, default values, and where they’re used in code.  
> Also explains how the configuration loader (`dotenv.ts`) works.

---

### 🧰 6. [utils.md](./utils.md)

> **Internal utilities and helpers.**  
> Documentation for internal helper functions like `num()`, `opts()`, `minmax()`, `createSafeObject()`, etc.  
> Each function is explained with examples and intended usage.

---

### 🧑‍💻 7. [development.md](./development.md)

> **Guide for setting up the development environment.**  
> Includes instructions for running the project locally, using ESLint and Prettier, handling migrations, and debugging the app.

---

### 🧠 8. [decisions/](./decisions)

> **Architecture Decision Records (ADR).**  
> A folder containing small markdown files explaining _why_ certain technical decisions were made (e.g., using Zod instead of class-validator, or Knex instead of Prisma).  
> Each file is numbered like `001-why-zod.md`.

---

### 📜 9. [api.md](./api.md)

> **API Reference.**  
> Describes the available HTTP endpoints, request/response formats, and example payloads.  
> Can be generated automatically or maintained manually.

---

## 🧩 Contributing

- Keep this documentation up to date when making architectural or structural changes.
- When adding a new module or core concept, create a new `.md` file and link it here.
- For major design changes, create a new record in `docs/decisions/`.

---

## 🗂 Folder structure (recommended)
