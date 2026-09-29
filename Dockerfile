FROM oven/bun:1-alpine
WORKDIR /app
COPY src ./src
COPY public ./public
RUN mkdir -p .messages && chown bun:bun .messages
USER bun
EXPOSE 3000
CMD ["bun", "src/server.ts"]
