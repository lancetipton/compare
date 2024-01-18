import type { TClsTypes } from '@keg-hub/jsutils/cls'

import { twMerge } from "tailwind-merge"
import { cls } from '@keg-hub/jsutils/cls'


export function cn(...inputs:TClsTypes[]) {
  return twMerge(cls(inputs))
}
