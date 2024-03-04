import type { Compare } from '@compare/recorder'

import '@compare/recorder'
import { useState } from 'react'
import { ife } from '@keg-hub/jsutils/ife'
import { limbo } from '@keg-hub/jsutils/limbo'

export const useCompare = () => {
  const [Compare, setCompare] = useState<Compare>(undefined)

  ife(async () => {

    const [err, cpar] = await limbo<Compare>(window.Compare)
    if(err) console.error(err)
    else setCompare(cpar)

    /**
     * Loading Compare without await
    window.Compare
      .then((cpar) => setCompare(cpar))
      .catch(err => console.error(err))
     */

  })

  return Compare
}
