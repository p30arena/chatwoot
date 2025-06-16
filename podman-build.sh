podman compose build base
podman compose build
podman compose run --rm rails bundle exec rails db:chatwoot_prepare
podman compose run --rm rails bundle exec "BUILD_MODE=library bin/vite build"
podman compose up
