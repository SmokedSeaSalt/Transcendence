#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$DIR/generate-ssl.sh"
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up --build