# Stage 1: Build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Stage 2: Production
FROM node:lts-alpine AS runner

WORKDIR /app

# Copy built files and production dependencies
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]