import prisma from "@/lib/prisma";

export async function cleanupExpiredDemoUsers(): Promise<number> {
  const expiredUsers = await prisma.user.findMany({
    where: {
      isDemo: true,
      demoExpiresAt: { lt: new Date() },
    },
    select: { id: true },
  });

  const userIds = expiredUsers.map((user) => user.id);
  if (userIds.length === 0) return 0;

  return prisma.$transaction(async (tx) => {
    await tx.order.deleteMany({
      where: { userId: { in: userIds } },
    });

    const result = await tx.user.deleteMany({
      where: { id: { in: userIds } },
    });

    return result.count;
  });
}