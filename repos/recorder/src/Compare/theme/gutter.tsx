const mSize = 20
const pSize = 20

const margin = {
  size: mSize,
  px: `${mSize}px`,
  hpx: `${mSize / 2}px`,
  tpx: `${mSize / 3}px`,
  qpx: `${mSize / 4}px`,
  spx: `${(mSize / 4) * 3}px`,
}
const padding = {
  size: pSize,
  px: `${pSize}px`,
  hpx: `${pSize / 2}px`,
  tpx: `${pSize / 3}px`,
  qpx: `${pSize / 4}px`,
  spx: `${(pSize / 4) * 3}px`,
}

export const gutter = {
  margin,
  m:margin,
  padding,
  p:padding
}