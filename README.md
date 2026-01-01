# 💰 PocketGuard – AI-Powered Finance Management Platform

PocketGuard is a real-time personal finance management web application that helps users track expenses, manage budgets intelligently, and receive actionable financial insights with automated alerts.

---

## 🚀 Features

- **Real-Time Expense Categorization**
  - Automatically categorizes transactions (Food, Travel, Bills, etc.)
  - Minimizes manual input using rule-based and AI-driven logic

- **Smart Budgeting**
  - Create and manage monthly budgets by category
  - Continuous tracking of spending against set limits

- **Actionable Financial Insights**
  - Analyzes spending patterns
  - Provides personalized suggestions to improve savings

- **Automated Alerts & Notifications**
  - Budget limit warnings
  - Unusual spending detection
  - Savings goal alerts

- **Interactive Dashboards**
  - Responsive and user-friendly UI
  - Visual charts and financial summaries

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI

### Backend & Services
- Clerk – Authentication & user management
- Supabase – PostgreSQL database & backend services
- Prisma – Type-safe ORM
- Inngest – Event-driven background jobs and automation

---

## 🧩 Architecture Overview

1. User authentication via Clerk  
2. Transaction data stored in Supabase  
3. Prisma handles database operations and categorization logic  
4. Inngest triggers automated alerts and insights  
5. Dashboards update in real time

---

## ⚙️ Installation & Setup

```bash
git clone https://github.com/your-username/pocketguard.git
cd pocketguard
npm install
