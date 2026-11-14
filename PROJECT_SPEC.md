# 📘 StudyGrove — Master Spec (Merged & Simplified)

> **Purpose:** Single source of truth for Cursor. Reference with `@PROJECT_SPEC.md` in every prompt.

---

## 🎯 What We're Building

A **UK GCSE study app** for Years 8–11 students. It helps them **Prepare → Plan → Practice → Focus** through daily habits.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Lucide Icons · Supabase (later) · Stripe (later)

**Reference files** (visual + logic source): `_reference/aistudio_prototype/` and `_reference/prototype_screenshots/`

---

## 🎨 Design Rules (Non-Negotiable)

- **Colors:** Dark green `#0F5132` (sidebar) · Mint `#10B981` (accent) · Navy `#1E293B` (primary buttons) · Off-white `#F8FAFC` (workspace bg)
- **Layout:** 3-column shell — Left Nav `240px` · Center Workspace `flex-1` · Right Dock `320px`
- **Icons:** Lucide React only
- **Match screenshots pixel-for-pixel** in `_reference/prototype_screenshots/`

---

## 🏗 App Shell (Every Page Wraps This)

### 1. Left Sidebar (fixed, 240px)
- **Top:** StudyGrove logo + tagline "GCSE Habit Engine"
- **Exam board tab:** `AQA · EDEXCEL · OCR`
- **Nav links:**
  - 🏠 Practice Hub → `/dashboard`
  - ⏱️ Deep Focus → `/focus`
  - 📅 Schedule → `/schedule`
  - 🧠 Mind Maps → `/mindmaps`
  - 🎴 Flashcards → `/flashcards`
  - 📝 Question Bank → `/quizzes`
- **7 Courses grid** (icons): Physics, Chem, Biology, Maths, CS, English, Geo
- **Bottom card:** "My Study Grove" — tree count, mini-forest, "View Forest →" link
- **Footer:** Day/Night toggle · Settings link

### 2. Top Header (spans workspace + right dock)
- Search bar (left)
- Year selector pills: `Year 9 · Year 10 · Year 11`
- 🔥 Streak badge (e.g., "5 Day Streak")
- XP bar (e.g., "Lvl 12 · 2,450 XP")
- Sun/moon theme toggle
- **"Quick 25m Focus"** button (dark navy)
- Avatar + name ("Hansi · Year 10 · GCSE")

### 3. Right Dock (fixed, 320px, collapsible)
- **Daily Practice Target** card: progress bar + "Practice Next (+25 XP)" button
- **Revision Tasks** list: filter pills (All / Today / Upcoming), checkboxes, due-date tags
- **Floating bottom-right:** "25m Focus" mini-timer button

---

## 🔀 Routing Map

```text
/                          → Landing page
/auth/login, /auth/signup  → Auth
/onboarding                → Pick exam board + subjects
/app
  /dashboard               → Practice Hub (main)
  /focus                   → Pomodoro Forest
  /schedule                → Calendar / Timetable
  /mindmaps                → Topic mastery node graph
  /flashcards              → Deck overview → /session/:subjectId
  /quizzes                 → Quiz directory → /play/:quizId
  /settings                → Profile / Subjects / Billing
/pricing                   → Stripe paywall