FROM node:lts-alpine
WORKDIR /app
RUN npm install -g pnpm turbo pm2

ARG PHASE
ENV TURBO_TOKEN=zakelstorm

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY turbo.json .
COPY .turbo .
COPY .npmrc .

COPY apps/blog ./apps/blog
COPY packages ./packages
RUN rm -rf ./.next/cache

RUN apk add --no-cache libc6-compat
RUN apk update

RUN pnpm install
RUN pnpm turbo run build --filter @zakelstorm/blog

EXPOSE 80

CMD ["pnpm", "--filter", "@zakelstorm/blog", "start:pm2"]