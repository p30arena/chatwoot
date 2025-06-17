podman compose -f docker-compose.production.yaml run --rm rails bundle exec rails db:chatwoot_prepare
podman compose -f docker-compose.production.yaml up -d
