#!/bin/bash

usage="Usage: pnpm icons [OPTIONS]...
Shorthand to generate AvailableIcon type in the project

Options:
  --help        Generate AvailableIcon type
"

while [ $# -gt 0 ]; do
    case "$1" in
    --help | -h)
        echo -e "\033[32m${usage}\033[39m"
        exit 0
        ;;
    esac
    shift
done

tsc -esModuleInterop scripts/modules/generatIconsType.ts && mv scripts/modules/generatIconsType.js scripts/modules/generatIconsType.cjs && node scripts/modules/generatIconsType.cjs && rm scripts/modules/generatIconsType.cjs
