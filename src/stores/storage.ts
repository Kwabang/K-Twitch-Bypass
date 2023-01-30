import { useStorage } from '@plasmohq/storage/hook'

export type ProxyType = 'workers'

export interface ProxyTargetsStorage {
  type: ProxyType
  host: string
}

export type ISPListStorage = 'auto' | 'kt' | 'skb' | 'lgu+' | 'others'

export function useBypassStatus() {
  return useStorage<boolean>('isBypassActive', (state) =>
    state === undefined ? false : state,
  )
}

export function useBypassISP() {
  return useStorage<ISPListStorage>('bypassISPList', (state) =>
    state === undefined ? 'auto' : state,
  )
}
