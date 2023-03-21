import { bexBackground } from 'quasar/wrappers'
import { api } from 'src/api/api'
import { LocalStorage } from 'quasar'
import { ISession } from 'src/stores/session'
import { BexBridge } from '@quasar/app-vite'

declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never]
    getTime: [never, number]

    'storage.get': [{ key: string | null }, any]
    'storage.set': [{ key: string; value: any }, any]
    'storage.remove': [{ key: string }, any]
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

let polling = false

const fetchNotifications = async (bridge: BexBridge) => {
  const session = LocalStorage.getItem('session') as ISession

  if (session?.settings.valid) {
    try {
      const notifications = await api(
        session.settings.url,
        session.settings.token
      ).fetchNotifications()

      bridge.send('update_notifications', { notifications })

      const total = notifications.filter(({ readAt }) => !readAt).length
      chrome.browserAction.setBadgeText({
        text: total > 0 ? total.toString() : '',
      })
    } catch (e) {
      console.error(e)
      bridge.send('update_notifications', { notifications: [] })
      chrome.browserAction.setBadgeText({
        text: '',
      })
    }
  }

  setTimeout(
    () => fetchNotifications(bridge),
    session.settings.refreshInterval
      ? session.settings.refreshInterval * 1000
      : 10000
  )
}

export default bexBackground((bridge /* , allActiveConnections */) => {
  bridge.on('log', ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, ...(data.data || []))
    respond()
  })

  bridge.on('getTime', ({ respond }) => {
    respond(Date.now())
  })

  bridge.on('storage.get', ({ data, respond }) => {
    const { key } = data
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        respond(Object.values(items))
      })
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key])
      })
    }
  })

  bridge.on('storage.set', ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond()
    })
  })

  bridge.on('storage.remove', ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond()
    })
  })

  const session = LocalStorage.getItem('session') as ISession

  if (session?.settings.valid) {
    bridge.send('load', { session })
  }

  bridge.on('update_read_notifications_badge', ({ data }) => {
    chrome.browserAction.setBadgeText({
      text: data > 0 ? data.toString() : '',
    })
  })

  if (!polling) {
    polling = true
    fetchNotifications(bridge)
  }
})
