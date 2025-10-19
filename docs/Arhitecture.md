# 🏗 Project Architecture

This document describes the internal architecture and organization of the project.  
It explains the structure of the source code, the purpose of each directory, and how the main components interact.

---

## 📂 Root Structure

src/
├── config/ # Global configuration modules (dotenv, jwt, knex, etc.)
├── core/ # Core runtime logic (server, error handler, shutdown, base types)
├── middleware/ # Custom reusable middlewares (e.g. authentication)
├── modules/ # Main application features, grouped by domain
├── routes/ # Centralized router aggregator
├── services/ # Shared or secondary services (e.g. share routes)
├── types/ # Global project-wide TypeScript types
├── utils/ # Common helper functions and utilities
└── views/ # EJS templates (layouts, partials, pages)

---

## ⚙️ Core Design Principles

1. **Feature-based modularity**  
   Each major feature (like `auth`, `urls`, `users`, `visits`) is self-contained within `src/modules/<feature>`, including:

   - `controller.ts` – Handles Koa requests/responses
   - `service.ts` – Contains business logic
   - `repository.ts` – Communicates with the database via Knex
   - `model.ts` – Defines Zod schemas and TypeScript types
   - `validate.ts` – Input validation helpers
   - `routes.ts` – Defines the feature’s endpoints

2. **Thin controllers, smart services**  
   Controllers should be minimal and delegate most logic to the service layer.

3. **Type-safe everything**  
   All data structures, configs, and request handlers use Zod schemas for runtime validation + type inference.

4. **Environment-driven configuration**  
   Environment variables are defined and loaded via `src/config/dotenv.ts`.

5. **Error-first design**  
   All errors are handled through a global middleware (`core/errorHandler.ts`) that returns standardized JSON error responses.

---

## 🧩 Core Layers

### `config/`

Handles global configuration for the app:

- **dotenv.ts** – Loads environment variables and validates them.
- **jwt.ts** – Manages JWT creation/verification and security options.
- **encryption.ts** – Password hashing via `bcryptjs`.
- **knex.ts** – Initializes Knex and database connection.
- **koaBody.ts** – Configures body parser.
- **helmet.ts** – Sets security headers using `koa-helmet`.

> Each file in this directory exports either a ready-to-use instance or a configuration object.

---

### `core/`

Contains essential logic for the Koa server:

- **server.ts** – Main Koa initialization, middleware mounting, router registration.
- **errorHandler.ts** – Global try/catch wrapper for Koa.
- **shutdown.ts** – Graceful shutdown handling.
- **types/** – Context, middleware, and state typings shared across the app.

---

### `middleware/`

Reusable middlewares that are not specific to a feature:

- **requireAuth.ts** – JWT authentication guard for protected routes.

---

### `modules/`

Feature modules — the heart of the application.

#### Example: `modules/urls/`

- **controller.ts** – Accepts and responds to HTTP requests.
- **service.ts** – Contains logic for shortening URLs, fetching, deleting.
- **repository.ts** – Performs DB operations (`createUrl`, `findById`, etc.).
- **model.ts** – Zod schemas (`UrlSchema`, `IUrl`).
- **validate.ts** – Additional validation utilities.
- **routes.ts** – Koa router defining `/urls` endpoints.

Each other module (auth, users, visits, health) follows the same structure.

---

### `routes/`

- **router.ts** – Combines all module routers into a single application router.
  ```ts
  import Router from "@koa/router";
  import { router as auth } from "../modules/auth/routes";
  import { router as urls } from "../modules/urls/routes";
  // ...
  utils/
  Generic helpers used across the app:
  ```

ensure.ts, math.ts, objects.ts, firstrow.ts, etc.
Utilities for type-checking, math operations, object merging, etc.

services/share/
A specialized service module used outside main modules/.
It’s meant for public or shared endpoints (e.g. shareable links).

views/
EJS templates organized by:

layouts/ – base structures (head, header, footer)

templates/ – reusable HTML components

main .ejs files for routes

docs/
Project documentation (what you’re reading).
Includes subtopics like:

auth.md – authentication logic

utils.md – helper utilities

configuration.md – environment and config setup

core-concepts.md – architectural patterns

oldVersion/
Legacy version of the project kept for reference.
May be removed later after full migration.

migrations/
Knex migration files defining database schema evolution.

tests/, temp/, uploads/
Supporting directories:

tests/ – placeholder for automated tests

temp/ – temporary files

uploads/ – static user-uploaded content

🔄 Request Flow

Request → Router → Controller → Service → Repository → Database
↓
Response
Each step is isolated, type-safe, and validated using Zod schemas.

✅ Summary
This architecture focuses on:

Clear separation of concerns

Runtime + compile-time safety via Zod

Scalable modular design

Predictable request flow

Centralized configuration and middleware

💡 See also:

core-concepts.md — for implementation details

modules.md — for per-module breakdown

configuration.md — for environment setup
