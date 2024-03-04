import { addToProcess } from '@keg-hub/cli-utils'
import { loadConfigs } from '@keg-hub/parse-config'

export const loadConfig = () => {

  addToProcess(
    loadConfigs({
      name: 'compare',
      locations: [],
      env: process.env.NODE_ENV || `local`,
      
    })
  )


  const envs = Object.entries(process.env).reduce((acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value)
    return acc
  }, {} as Record<string, string>)

  return {
    aliases: {},
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.LK_FE_PORT || '19019', 10),
    envs: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      ...envs
    },
  }
}
