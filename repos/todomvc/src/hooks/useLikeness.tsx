import type { Likeness } from '@likeness/recorder'

import '@likeness/recorder'
import { useState } from 'react'
import { ife } from '@keg-hub/jsutils/ife'
import { limbo } from '@keg-hub/jsutils/limbo'

export const useLikeness = () => {
  const [Likeness, setLikeness] = useState<Likeness>(undefined)

  ife(async () => {

    const [err, lkns] = await limbo<Likeness>(window.Likeness)
    if(err) console.error(err)
    else setLikeness(lkns)

    /**
     * Loading Likeness without await
    window.Likeness
      .then((lkns) => setLikeness(lkns))
      .catch(err => console.error(err))
     */

  })

  return Likeness
}
