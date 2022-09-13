#!/usr/bin/env coffee

> @rmw/thisdir
  ./src/captcha.js
  path > join
  fs > writeFileSync

ROOT = thisdir(import.meta)

n = 0
while ++n < 100
  [img, x, y, size, id] = await captcha()

  console.log(n, x, y, size, id)
  writeFileSync(
    join ROOT,"demo/#{n}.webp"
    Buffer.from img
  )