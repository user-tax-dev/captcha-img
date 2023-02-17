#!/usr/bin/env coffee

> @u7/uridir
  @user.tax/captcha-img
  path > join
  fs > writeFileSync
  await-sleep:sleep

ROOT = uridir(import.meta)

n = 0
while ++n < 1e9
  [img, x, y, size, id] = await CaptchaImg(750,40)
  console.log(n, x, y, size, id)
  await sleep 0
  #gc()
  #console.log img
  #writeFileSync(
  #  join ROOT,"demo/#{n}.webp"
  #  Buffer.from img
  #)
  #gc()
