FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install --global npm@11.12.1 && npm ci

FROM deps AS migrate
COPY prisma ./prisma
COPY prisma7.config.ts ./
CMD ["npx", "prisma", "migrate", "deploy"]

FROM deps AS builder
COPY . .
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build?schema=public
ENV NEXT_TELEMETRY_DISABLED=1
RUN npx prisma generate && npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S nodejs -g 1001 && adduser -S nextjs -u 1001 -G nodejs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/app/generated/prisma ./app/generated/prisma
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]