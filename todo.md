Phase 1: Shell
1.1 Next.js App Router + Tailwind + Lucide + fonts
1.2 3-column shell (Left Nav, Center, Right Dock) — done
1.3 Top Header (logo, Year pills, streak, XP, Quick Focus) — done
1.4 Sidebar + My Study Grove card — done

Phase 2: Data Layer
2.1 TypeScript interfaces (types/index.ts) — done
2.2 Mock data files (data/mockQuestions.ts, mockTasks.ts, mockFlashcards.ts) — done
2.3 Service layer (services/) — components fetch via this — done

Phase 3: Quiz Engine
3.1 QuizCard.tsx + wire to mock questions — done
3.2 Click states (green/red, show explanation, +XP) — done
3.3 SVG diagram renderer — done
3.4 Skip / subject filters / keyboard shortcuts (A–D) — done

Phase 4: Tasks & Dock
4.1 ContextDock.tsx with target + task list — done
4.2 Interactive checkboxes + live progress bar — done

Phase 5: Pomodoro
5.1 25-min timer modal (triggered from header + dock) — done
5.2 Start/Pause/Reset + increment tree count on complete — done

Phase 6: Flashcards
6.1 Flashcards page with 3D flip + mock deck — done
6.2 SM-2 rating buttons — done

Phase 7: Backend
7.1 Supabase auth (Google + Email)
7.2 Postgres tables + seed data
7.3 Swap services/ mock → Supabase queries

Phase 8: Monetization
8.1 Stripe Checkout (monthly + annual)
8.2 Free-tier limits + paywall
8.3 Deploy to Vercel, delete _reference/