FROM node:24-alpine as builder

ENV NODE_ENV=build

USER node
WORKDIR /app

COPY package*.json ./
RUN npm ci

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
COPY --chown=node:node . .
RUN npx prisma generate \
    && npm run build \
    && npm prune --omit=dev

# ---

FROM node:24-alpine

ENV NODE_ENV=production

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/
COPY --from=builder --chown=node:node /app/prisma ./prisma

RUN npx prisma migrate deploy

CMD ["node", "dist/src/main.js"]