#!/bin/sh
# Tiedosto helpottaa kontin sisäisten komentojen ajoa

# käynnistä kontti jos se ei ole käynnissä
if ! docker ps | grep -q fs-monorepo; then
    echo "Starting development container..."
    docker compose up -d
fi

if [ $# -eq 0 ]; then
    # avaa oletuksena terminaaliyhteys konttiin
    docker compose exec devenv sh
else
    # muutoin aja komennot kontissa
    docker compose exec devenv "$@"
fi