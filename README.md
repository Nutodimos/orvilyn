# Orvilyn

> **You’ve got a business. We’ll handle the tech.**  
> Websites, web apps, internal tools, mobile apps, and motion design for businesses that want the tech handled without jargon or surprise bills.

---

## 📖 Product & Developer Documentation
For the complete engineering manual, brand themes, UI motion standards, and architecture guide, please refer to:
👉 **[PRODUCT_DOCUMENTATION.md](./PRODUCT_DOCUMENTATION.md)**

---

## ⚡ Tech Stack Quick Summary
- **Framework**: Next.js 16.4 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 + Design Tokens in `src/app/globals.css`
- **Motion**: Framer Motion 14 + Emil Kowalski motion principles
- **Database & ORM**: PostgreSQL (Neon Serverless) + Prisma ORM 6
- **Communications**: Resend API (Transactional Lead Ingestion & Alerts)
- **Typography**: Plus Jakarta Sans (Headings) + DM Sans (Body)

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   ```bash
   cp .env.example .env
   ```
   Configure `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, and `LEAD_HASH_SALT`.

3. **Generate Prisma Client & Sync DB**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the local dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🎨 Portfolio Work & Categorization Architecture

To maintain clear separation and consistent hierarchy across the portfolio:
- **Regular Work Page (`/work` main band / `src/data/projects.ts`)**: Reserved strictly for **Software Development** projects (web applications, mobile apps, SaaS platforms, internal tools). Only software engineering builds belong in this list.
- **Motion Work Band (`#motion` / `src/data/motion.ts`)**: Reserved for **Motion Design & Motion Identity** pieces (procedural animation, kinetic identity, brand films, such as Tidewell). Never place motion case studies in the regular software projects list; link to dedicated motion case studies directly from their tile in the motion section.
  👉 *Motion crew export specs and handoff guidelines*: **[docs/MOTION-CREW-HANDOFF.md](./docs/MOTION-CREW-HANDOFF.md)**


