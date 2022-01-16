FROM denoland/deno:1.17.3

EXPOSE 7621

WORKDIR /APP

USER deno

COPY src/deps.ts .
RUN deno cache deps.ts

ADD src .

# Adding the --watch flag may be beneficial on Non-M1 machines for easier development flow
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-run", "main.ts"]