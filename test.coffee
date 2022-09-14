#!/usr/bin/env coffee

> @rmw/thisdir
  @user.tax/captcha
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
