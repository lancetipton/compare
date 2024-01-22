

export const resolveUI = () => {

  let resolve:((value:any) => void)|undefined
  let reject:((reason:string|Error) => void)|undefined

  let promise:Promise<unknown>|undefined = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  const clean = () => {
    reject = undefined
    resolve = undefined
    promise = undefined
  }

  return {
    clean,
    promise,
    // @ts-ignore
    reject,
    // @ts-ignore
    resolve,
  }
}