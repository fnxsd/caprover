FROM binwiederhier/ntfy:v1.9.0
COPY server.yml /etc/ntfy/server.yml

ENTRYPOINT ["ntfy", "serve"]
