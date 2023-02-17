#!/usr/bin/env bash

_DIR=$(cd "$(dirname "$0")"; pwd)

cd $_DIR

set -ex

git add -A
git commit -m.
git pull

version=$(cat package.json|jq -r '.version')

npm version patch
git add -u
git commit -m v$version || true
git push
npm publish --access=public
