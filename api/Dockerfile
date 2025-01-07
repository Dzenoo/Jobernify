# ------------------------------
# Stage 1: Build
# ------------------------------
FROM node:lts-alpine AS builder

WORKDIR /app

# Copy the entire monorepo into /app
COPY . .

# (Optional) confirm no .dockerignore removes 'shared/' or 'api/'
# E.g., ensure your .dockerignore doesn't exclude these folders.

# Install dependencies for ALL workspaces
# Yarn sees the root package.json with "workspaces": ["api", "shared", ...]
RUN yarn install --frozen-lockfile

# Build all packages or build specifically what you need.
# E.g. build shared first, then api:
# RUN yarn workspace @jobernify/shared build
# RUN yarn workspace api build

# Or just do a global monorepo build script if you have one:
RUN yarn build

# ------------------------------
# Stage 2: Production
# ------------------------------
FROM node:lts-alpine AS runner

WORKDIR /app

# Copy only what's needed for runtime
COPY --from=builder /app/api/dist dist
COPY --from=builder /app/api/package.json package.json
COPY --from=builder /app/yarn.lock yarn.lock

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 8080

CMD ["yarn", "start:prod"]
