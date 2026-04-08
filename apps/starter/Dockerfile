ARG NODE_VERSION=24.13.1
FROM node:${NODE_VERSION}-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# The build happens in CI. Copy prebuilt artifacts from the build workspace.
COPY --chown=nextjs:nodejs apps/starter/.next/standalone ./
COPY --chown=nextjs:nodejs apps/starter/.next/static ./apps/starter/.next/static
COPY --chown=nextjs:nodejs apps/starter/public ./apps/starter/public

CMD node apps/starter/server.js
