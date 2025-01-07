# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files and build the NestJS app
COPY . .
RUN yarn build

# Stage 2: Production
FROM node:lts-alpine AS runner

WORKDIR /app

# Copy build artifacts and production dependencies
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 8080

CMD ["yarn", "start:prod"]