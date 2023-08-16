FROM denoland/deno:alpine
WORKDIR /app

EXPOSE 8000
EXPOSE 8001
EXPOSE 8002
EXPOSE 8003

ADD . .
RUN deno cache mod.ts

CMD ["deno", "run", "-A", "mod.ts"]