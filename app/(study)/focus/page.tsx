import { connection } from "next/server";
import { FocusHubClient } from "@/components/focus/FocusHubClient";
import { fetchForestTrees } from "@/services/groveService";
import { fetchUserStats } from "@/services/userService";

export default async function FocusPage() {
  await connection();
  const [trees, stats] = await Promise.all([
    fetchForestTrees(),
    fetchUserStats(),
  ]);

  return (
    <FocusHubClient
      trees={trees}
      forestTreesCount={stats.forestTreesCount}
    />
  );
}