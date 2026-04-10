#!/bin/sh
# Tiedosto helpottaa kontin sisäisten komentojen ajoa

# käynnistä kontti jos se ei ole käynnissä
if ! docker ps | grep -q fs-monorepo; then
    echo "Starting development container..."
    docker compose up -d
fi

if [ $# -eq 0 ]; then
    # avaa oletuksena terminaaliyhteys konttiin
    # yrittää käynnistää ensisijaisesti bash- ja toissijaisesti sh-terminaalin
    if docker compose exec devenv test -x /bin/bash; then
        docker compose exec devenv bash
    else
        echo "bash is not installed, using sh"
        docker compose exec devenv sh
    fi
else
    # muutoin aja komennot kontissa
    docker compose exec devenv "$@"
fi