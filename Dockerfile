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
RUN apk add --no-cache chromium font-dejavu tini
WORKDIR /app
COPY src ./src
# Instructions for the Gemini backend (src/gemini.ts).
COPY docs ./docs
COPY frontend/cv/data.ts ./frontend/cv/data.ts
COPY --from=build /app/dist ./dist
RUN mkdir -p .messages && chown bun:bun .messages
USER bun
EXPOSE 3000
# tini reaps Chromium processes killed by the PDF timeout; Cloud Run has no init process.
# -s: also works under `docker run --init` / compose `init: true`, where tini is not PID 1.
ENTRYPOINT ["/sbin/tini", "-s", "--"]
CMD ["bun", "src/server.ts"]
