import { useStorage } from '@plasmohq/storage/hook'

export type ProxyType = 'workers'

export interface ProxyTargetsStorage {
  type: ProxyType
  host: string
}

export function useProxyStatus() {
  return useStorage<boolean>('isProxyActive', (state) =>
    state === undefined ? false : state,
  )
}

export function useProxyTarget() {
  return useStorage<ProxyTargetsStorage>('proxyTarget', {
    type: 'workers',
    host: 'https://api.twitch.tyo.kwabang.net',
  })
}
