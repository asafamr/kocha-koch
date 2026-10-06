# Stage 1: bundle the React frontend. Only runtime deps (react, react-dom) are installed.
FROM oven/bun:1-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache bun install --frozen-lockfile --production
COPY frontend ./frontend
COPY src ./src
RUN bun run build

# Stage 2: server + static bundle, no node_modules. Chromium renders CV PDFs (src/pdf.ts);
# DejaVu is a fallback for glyphs the CV's embedded fonts lack.
FROM oven/bun:1-alpine
RUN apk add --no-cache chromium font-dejavu
WORKDIR /app
COPY src ./src
COPY --from=build /app/dist ./dist
RUN mkdir -p .messages && chown bun:bun .messages
USER bun
EXPOSE 3000
CMD ["bun", "src/server.ts"]
