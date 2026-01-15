FROM node:24-alpine as dependencies
WORKDIR /finance
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine as builder
WORKDIR /finance
COPY . .
COPY --from=dependencies /finance/node_modules ./node_modules
RUN npm run build

FROM node:24-alpine as runner
WORKDIR /finance
# ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 frontend

# COPY --from=builder /finance/public ./public
COPY --from=builder /finance/package.json ./package.json
COPY --from=builder /finance/.next ./.next
COPY --from=builder /finance/node_modules ./node_modules

USER frontend

EXPOSE 3000
CMD ["npm", "run", "start"]