# Stage 1: Build only the NESTJS API
FROM node:lts-alpine AS builder

WORKDIR /app

# Copy just what's needed for the Nest API
# (If the API references code in `shared/`, you must also copy `shared/`)
COPY package.json yarn.lock ./
COPY api ./api
COPY shared ./shared 

WORKDIR /app/api

# Install dependencies for this workspace
# If your `api/package.json` references the shared package, Yarn can handle it 
# as long as your root package.json has "workspaces" and "shared" is in them.
RUN yarn install --frozen-lockfile

RUN yarn workspace api build

# Stage 2: Production
FROM node:lts-alpine AS runner

WORKDIR /app

COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile

EXPOSE 8080
CMD ["yarn", "start:prod"]
