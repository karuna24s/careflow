# CareFlow: System Design

This document outlines the architectural decisions, scalability considerations, and security posture of the CareFlow platform.

---

## 1. System Overview

CareFlow is a monorepo-based full-stack TypeScript application for clinical intake and patient onboarding. It emphasizes **contract-driven development** via shared Zod schemas, ensuring data integrity from frontend input through API persistence.

### Core Components

| Component | Technology | Responsibility |
|-----------|------------|----------------|
| **Web** | React 19, Vite 7 | UI, form state, client-side validation |
| **API** | Node.js, Express | Validation middleware, routing, business logic |
| **Shared** | Zod, TypeScript | Single source of truth for schemas and types |

---

## 2. Scalability

### 2.1 Horizontal Scaling

- **Stateless API:** The API holds no in-memory session state. Each request is independent, enabling multiple instances behind a load balancer.
- **Shared schema package:** Validation logic lives in `packages/shared`, so new services (e.g., a worker, another API) can reuse the same contracts without duplication.

### 2.2 Vertical Scaling

- **Lightweight runtime:** Express and Zod are low-overhead. The API can handle moderate traffic on a single instance.
- **Async validation:** Zod parsing is synchronous but fast. For very high throughput, consider moving validation to a dedicated layer or using streaming validation for large payloads.

### 2.3 Data Layer (Future)

- **Database choice:** PostgreSQL recommended for relational data, JSONB for flexible intake metadata.
- **Caching:** Redis for session tokens, rate limits, or frequently accessed reference data.
- **Queue:** For async processing (e.g., email notifications, analytics), add a job queue (BullMQ, SQS) to decouple intake submission from downstream workflows.

### 2.4 Monorepo Scaling

- **Workspace isolation:** Each app (`apps/api`, `apps/web`) and package (`packages/shared`) has its own `package.json`. Dependencies are hoisted where possible.
- **Build order:** Use `npm run build --workspaces` to build in dependency order. Consider Turborepo or Nx for incremental builds as the repo grows.

---

## 3. Security

### 3.1 Input Validation

- **Zod at the edge:** All intake data is validated with `PatientIntakeSchema.parse()` before any business logic. Invalid payloads are rejected with `400 Bad Request` and structured error messages.
- **No raw `req.body` usage:** Controllers never trust unvalidated input. Parsed data is strictly typed.

### 3.2 API Security

| Concern | Current State | Recommendation |
|---------|---------------|----------------|
| **CORS** | Enabled for all origins | Restrict to known frontend origins in production |
| **Rate limiting** | Not implemented | Add `express-rate-limit` to prevent abuse |
| **Authentication** | Not implemented | Add JWT or session-based auth for protected routes |
| **HTTPS** | Assumed at reverse proxy | Enforce TLS; use `helmet` for security headers |
| **Sensitive data** | Logged to console | Avoid logging PII; use structured logging with redaction |

### 3.3 Data Protection

- **PII handling:** Child names, emails, and clinical data are sensitive. Ensure:
  - Encryption at rest (database, backups)
  - Encryption in transit (HTTPS)
  - Access controls and audit logs for who reads/writes data
- **Compliance:** Consider HIPAA, COPPA, or other regulations for healthcare/childcare data.

### 3.4 Dependency Security

- Run `npm audit` regularly.
- Pin major versions in `package.json`; use `npm ci` in CI for reproducible installs.

---

## 4. Error Handling

- **Global middleware:** `errorHandler` in `apps/api/src/middleware` catches all errors passed via `next(err)`.
- **Zod errors → 400:** Validation failures return `{ success: false, message, errors }` with field-level details.
- **Generic errors → 500:** Unhandled errors return a generic message; details are logged server-side only.

---

## 5. Extensibility

- **New intake fields:** Add fields to `PatientIntakeSchema` in `packages/shared`. Frontend and API stay in sync via the shared type.
- **New routes:** Add routers under `apps/api/src/routes`; register in `index.ts`.
- **New services:** Create new apps or packages under `apps/` or `packages/` and wire them into the workspace.

---

## 6. Operational Considerations

- **Health check:** `GET /health` returns service status for load balancers and monitoring.
- **Logging:** Replace `console.log` with a structured logger (Pino, Winston) for production.
- **Environment:** Use `process.env` for `PORT`, database URLs, and API keys. Never commit secrets.
