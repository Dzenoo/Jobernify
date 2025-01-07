# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY api ./api

COPY . .

WORKDIR /app/api

# Install dependencies
RUN yarn install --frozen-lockfile
RUN yarn build

# Stage 2: Production
FROM node:lts-alpine AS runner

WORKDIR /app

# Copy build artifacts and production dependencies
COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 8080

CMD ["yarn", "start:prod"]