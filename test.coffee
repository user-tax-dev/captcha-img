#!/usr/bin/env coffee

> @rmw/thisdir
  @user.tax/captcha-img
  path > join
  fs > writeFileSync

ROOT = thisdir(import.meta)

n = 0
while ++n < 2
  [img, x, y, size, id] = await CaptchaImg()
  console.log(n, x, y, size, id)
  console.log img
  writeFileSync(
    join ROOT,"demo/#{n}.webp"
    Buffer.from img
  )
