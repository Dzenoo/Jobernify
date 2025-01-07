###################################################
# Stage 1: Build
###################################################
FROM node:lts-alpine AS builder

# 1) Copy the monorepo root config
WORKDIR /app
COPY package.json yarn.lock ./

# 2) Copy all relevant workspaces so Yarn sees them (api, shared, etc.)
COPY api ./api
COPY shared ./shared
# If you also have "client", copy it too—Yarn may still need to see it for linking dependencies
# COPY client ./client

# 3) Install dependencies (including dev) from the root
RUN yarn install --frozen-lockfile

# 4) Build your shared + api packages
#    Use the EXACT name from shared/package.json (e.g. "@jobernify/shared")
RUN yarn workspace @jobernify/shared build
RUN yarn workspace api build

###################################################
# Stage 2: Production
###################################################
FROM node:lts-alpine AS runner

WORKDIR /app

# 1) Copy the built API code
COPY --from=builder /app/api/dist ./dist

# 2) Copy the API package.json and yarn.lock
COPY --from=builder /app/api/package.json ./
COPY --from=builder /app/yarn.lock ./

# 3) Copy node_modules from builder (so we don’t run `yarn install` again)
COPY --from=builder /app/node_modules ./node_modules

# If your API references typeorm migrations or other files inside /api, 
# you might also copy them from builder if needed, e.g.:
# COPY --from=builder /app/api/ormconfig.js ./

EXPOSE 8080

# 4) Launch Nest in production mode
CMD ["yarn", "start:prod"]
