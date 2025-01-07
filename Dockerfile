# ---------------------------------------------
# Stage 1: Build
# ---------------------------------------------
FROM node:lts-alpine as builder

WORKDIR /app

# Copy root package and lock files
COPY package.json yarn.lock ./

# Copy all local workspaces so Yarn sees them
COPY api ./api
COPY client ./client
COPY shared ./shared

# Install from the root so Yarn can link everything
RUN yarn install --frozen-lockfile

# Build 'shared' and 'api' only (avoids building 'client')
RUN yarn workspace @jobernify/shared build
RUN yarn workspace api build

# ---------------------------------------------
# Stage 2: Production
# ---------------------------------------------
FROM node:lts-alpine as runner

WORKDIR /app

# Copy compiled API artifacts
COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./
COPY --from=builder /app/yarn.lock ./

# Production dependencies only for the API
RUN yarn install --production --frozen-lockfile

EXPOSE 8080
CMD ["yarn", "start:prod"]
