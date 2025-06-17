docker compose build base
docker compose build
docker compose run --rm rails bundle exec rails db:chatwoot_prepare
docker compose run --rm rails bundle exec "BUILD_MODE=library bin/vite build"
docker compose up
