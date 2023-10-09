FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm ci && npm run build \
            && rm -rf node_modules \
            && npm ci --only=production --ignore-scripts

FROM node:18-alpine as final

ENV NODE_ENV "production"
ENV PORT 3000

WORKDIR /app
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules/ node_modules
COPY --chown=node:node --from=builder /app/dist/ dist

USER node
CMD ["npm", "start"]