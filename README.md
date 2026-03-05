# CareFlow

A high-integrity, full-stack TypeScript environment built with a focus on **Type Safety**, **Data Integrity**, and **Scalable Architecture**.

CareFlow serves as a benchmark for modern, contract-driven development, ensuring that data is validated at the edge before it enters the system.

## 🏗 Architecture
This project is structured as a **Monorepo** using **npm workspaces**:
- `apps/api`: Node.js + Express + TypeScript + Zod (Backend)
- `apps/web`: React + Vite + TypeScript (Frontend)
- `packages/shared`: (Planned) Shared validation schemas and utility types.



## 🚀 Strategic Tech Stack
- **Language:** TypeScript (Strict Mode)
- **Backend:** Node.js & Express
- **Frontend:** React & Vite
- **Validation:** Zod (Runtime type checking)
- **Database:** PostgreSQL (Planned via Prisma)

## 🛠 Project Philosophy
1. **Contract-Driven Development:** We define our data models once and share them across the entire stack to eliminate "contract drift."
2. **Predictable State:** Leveraging TypeScript and Zod to ensure the system is deterministic and easy to debug.
3. **Senior-Level Documentation:** A focus on why decisions were made, not just how.

## 🚀 Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Launch development environment: `npm run dev`

---

## 🩺 The Goal
To demonstrate a production-ready approach to complex data-entry workflows, ensuring that high-compliance or high-concurrency environments remain robust under load.