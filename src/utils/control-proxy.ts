import { sendToBackground } from '@plasmohq/messaging'

import type { Body as RequestBody } from '~background/messages/control-proxy'

export async function enableProxy() {
  await sendToBackground<RequestBody>({
    name: 'control-proxy',
    body: { type: true },
  })
}

export async function disableProxy() {
  await sendToBackground<RequestBody>({
    name: 'control-proxy',
    body: { type: false },
  })
}
