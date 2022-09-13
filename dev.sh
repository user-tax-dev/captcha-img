#!/usr/bin/env bash
set -e
DIR=$( dirname $(realpath "$0") )

cd $DIR

exec watchexec --shell=none \
  -w . \
  --exts coffee,js,mjs,json,wasm,txt,yaml \
  -r \
  -- ./run.sh
