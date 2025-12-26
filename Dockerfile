FROM node:25-alpine3.22 as base

FROM base as deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

FROM base as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM base as runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 10000

CMD ["node", "server.js"]
