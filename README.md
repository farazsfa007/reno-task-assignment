# Reno Notice Board Management System

A simple Notice Board Management System built with Next.js, TypeScript, Prisma, and Neon PostgreSQL.

## Live Demo

https://agent-6a2192cd060910152f844--reno-task-dashboard.netlify.app/

## GitHub Repository

https://github.com/farazsfa007/reno-task-assignment

---

## Features

* Create Notices
* View All Notices
* Update Existing Notices
* Delete Notices
* Notice Categories

  * Exam
  * Event
  * General
* Priority Levels

  * Normal
  * Urgent
* Publish Date Management
* Responsive UI
* PostgreSQL Database Integration

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* CSS

### Backend

* Next.js API Routes
* Prisma ORM

### Database

* Neon PostgreSQL

### Deployment

* Netlify

---

## Project Structure

```bash
pages/
│
├── index.tsx
├── notice/
│   ├── [id].tsx
│   └── new.tsx
│
├── api/
│   └── notices/
│       ├── index.ts
│       └── [id].ts

lib/
└── prisma.ts

prisma/
└── schema.prisma
```

---

## Database Schema

```prisma
model Notice {
  id          Int      @id @default(autoincrement())
  title       String
  body        String
  category    String
  priority    String
  publishDate DateTime
  createdAt   DateTime @default(now())
}
```

---

## Local Installation

### 1. Clone Repository

```bash
git clone https://github.com/farazsfa007/reno-task-assignment.git
cd reno-task-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your_neon_database_url"
```

---

### 4. Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

---

### 5. Generate Prisma Client

```bash
npx prisma generate
```

---

### 6. Start Development Server

```bash
npm run dev
```

Application will run on:

```text
http://localhost:3000
```

---

## API Endpoints

### Get All Notices

```http
GET /api/notices
```

### Create Notice

```http
POST /api/notices
```

### Get Single Notice

```http
GET /api/notices/:id
```

### Update Notice

```http
PUT /api/notices/:id
```

### Delete Notice

```http
DELETE /api/notices/:id
```

---

## Future Improvements

* User Authentication
* Search and Filtering
* Pagination
* Rich Text Editor
* File Attachments
* Notice Expiry Dates
* Role-Based Access Control
* Dashboard Analytics

---

## Author

Faraz

Built as a Full Stack Next.js Assignment Project using Prisma ORM and Neon PostgreSQL.
