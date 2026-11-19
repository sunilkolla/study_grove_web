import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeInit } from "@/components/theme/ThemeInit";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StudyGrove — GCSE habit engine",
    template: "%s · StudyGrove",
  },
  description:
    "Prepare, plan, practice, and focus for UK GCSE Years 8–11. Quizzes, flashcards, schedule, and Pomodoro forest in one workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f7fb] text-[#1a2437] dark:bg-[#141c2b] dark:text-[#f4f7fb]">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
