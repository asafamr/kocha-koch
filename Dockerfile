FROM oven/bun:1-alpine
WORKDIR /app
COPY src ./src
COPY public ./public
RUN mkdir -p data && chown bun:bun data
USER bun
EXPOSE 3000
CMD ["bun", "src/server.ts"]
