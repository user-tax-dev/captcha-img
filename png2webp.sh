#!/usr/bin/env bash

DIR=$(dirname $(realpath "$0"))
cd $DIR
set -ex
cwebp demo.png -blend_alpha 0xcffffff -q 70 -o out.webp
