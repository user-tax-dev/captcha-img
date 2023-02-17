#!/usr/bin/env coffee

> @u7/uridir
  @u7/extract > extractLi
  fs/promises > opendir
  @u7/read
  @u7/write
  path > join dirname

ROOT = uridir(import.meta)

li = []
for await f from await opendir ROOT
  if f.isFile() and f.name.endsWith('.svg')
    xml = read join ROOT,f.name
    t = [...extractLi xml,'d="','"']
    t.sort (a,b)=>b.length-a.length
    li.push t[0]

li.sort()

write(
  join(
    dirname ROOT
    'src/D.js'
  )
  'export default '+JSON.stringify(li)
)

