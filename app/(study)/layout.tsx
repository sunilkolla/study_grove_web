import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
    </ThemeProvider>
  );
}