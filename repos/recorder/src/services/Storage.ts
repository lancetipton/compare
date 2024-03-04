import type { TInitOpts } from '@CPAR/types'


import { CPAROptions } from '@CPAR/constants'

export class Storage {
  
  get = <T=unknown>(key:string, parse?:boolean) => {
    const value = window.localStorage.getItem(key)
    return (parse ? JSON.parse(value || `null`) ?? undefined : value) as T
  }

  set = (key:string, value:any, stringify?:boolean) => {
    const val = stringify ? JSON.stringify(value) : value
    window.localStorage.setItem(key, val)
  }

  remove = (key:string) => {
    window.localStorage.removeItem(key)
  }

  getOptions = () => this.get<TInitOpts>(CPAROptions, true)
  setOptions = (opts:TInitOpts) => this.set(CPAROptions, opts, true)

}

export const storage = new Storage()