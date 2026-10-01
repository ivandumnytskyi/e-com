import prisma from "@/lib/prisma";
import { cleanupExpiredDemoUsers } from "@/lib/demoUsers";

async function runCleanup() {
  const deletedCount = await cleanupExpiredDemoUsers();
  console.info(`Deleted ${deletedCount} expired demo user(s).`);
}

runCleanup()
  .catch((error) => {
    console.error("Demo-user cleanup failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });