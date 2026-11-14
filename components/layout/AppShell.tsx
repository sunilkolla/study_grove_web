import { AppShellClient } from "./AppShellClient";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <AppShellClient>{children}</AppShellClient>;
}