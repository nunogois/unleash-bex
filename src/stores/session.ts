import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'
import { INotification, IProject } from 'src/api/models'

export interface ISession {
  notifications: INotification[]
  projects: IProject[]
  settings: {
    url: string
    token: string
    refreshInterval: number
    valid: boolean
  }
}

export const useSession = defineStore('session', {
  state: () =>
    (LocalStorage.getItem('session') ?? {
      notifications: [],
      projects: [],
      settings: {
        url: '',
        token: '',
        refreshInterval: 10,
        valid: false,
      },
    }) as ISession,
  actions: {
    markNotificationAsRead(id: number) {
      const notification = this.notifications.find((n) => n.id === id)
      if (notification) {
        notification.readAt = new Date().toISOString()
      }
    },
  },
})
