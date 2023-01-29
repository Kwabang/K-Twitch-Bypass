import { useStorage } from '@plasmohq/storage/hook'

export type ProxyType = 'workers'

export interface ProxyTargetsStorage {
  type: ProxyType
  host: string
}

export function useBypassStatus() {
  return useStorage<boolean>('isBypassActive', (state) =>
    state === undefined ? false : state,
  )
}