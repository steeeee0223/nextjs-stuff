prisma-action() {
    echo "> Running prisma $@"
    for file in ./prisma/*.prisma; do
        prisma $@ --schema $file
    done
}

prisma-action $@