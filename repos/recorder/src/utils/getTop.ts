let top:any

export const getTop = () => {
  if(!top){
    if(typeof window !== `undefined`) top = window
    else if(typeof globalThis !== `undefined`) top = globalThis
    else top = global
  }

  return top
}