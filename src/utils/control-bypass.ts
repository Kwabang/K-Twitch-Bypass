import { sendToBackground } from '@plasmohq/messaging'

import type { Body as RequestBody } from '~background/messages/control-bypass'

export async function enableBypass() {
  await sendToBackground<RequestBody>({
    name: 'control-bypass',
    body: { type: true },
  })
}

export async function disableBypass() {
  await sendToBackground<RequestBody>({
    name: 'control-bypass',
    body: { type: false },
  })
}
