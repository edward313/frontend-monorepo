ARG NODE_VERSION=24.13.1
FROM node:${NODE_VERSION}-slim AS base

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# Set working directory
WORKDIR /app

# Enable pnpm via corepack once in base
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

# ---
FROM base AS prepare
COPY . .
# Add lockfile and package.json's of isolated subworkspace
RUN pnpm dlx turbo@2.8.11 prune starter --docker

# ---
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN pnpm install --frozen-lockfile
# Build the project
COPY --from=prepare /app/out/full/ .

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo build --filter starter

FROM node:${NODE_VERSION}-alpine AS runner
ENV NODE_ENV=production
# Don't run production as root for security reasons
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
WORKDIR /app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/starter/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/starter/.next/static ./apps/starter/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/starter/public ./apps/starter/public

CMD node apps/starter/server.js
