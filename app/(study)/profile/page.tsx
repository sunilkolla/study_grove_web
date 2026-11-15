import { connection } from "next/server";
import { ProfileSettingsClient } from "@/components/profile/ProfileSettingsClient";
import { fetchUserStats } from "@/services/userService";

export default async function ProfilePage() {
  await connection();
  const stats = await fetchUserStats();
  return <ProfileSettingsClient initialStats={stats} />;
}