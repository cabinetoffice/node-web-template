FROM node:20.5.1-alpine@sha256:f62abc08fe1004555c4f28b6793af8345a76230b21d2d249976f329079e2fef2 as builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src
RUN npm ci && npm run build \
            && rm -rf node_modules \
            && npm ci --only=production --ignore-scripts

FROM node:20.5.1-alpine@sha256:f62abc08fe1004555c4f28b6793af8345a76230b21d2d249976f329079e2fef2 as final

# ENV NODE_ENV "production"
# ENV PORT 3000

WORKDIR /app
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules/ node_modules
COPY --chown=node:node --from=builder /app/dist/ dist

USER node
CMD ["npm", "start"]