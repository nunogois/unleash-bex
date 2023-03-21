import axios from 'axios'
import {
  INotification,
  IProject,
  IProjectBase,
  IEnvironment,
  IToggle,
} from 'src/api/models'

export const api = (url: string, token: string) => {
  const $axios = axios.create({
    baseURL: url,
    headers: {
      Authorization: token,
    },
  })

  const fetchNotifications = async () =>
    $axios
      .get('/api/admin/notifications')
      .then(({ data }) => data as INotification[])

  const markNotificationAsRead = async (notificationId: number) =>
    $axios.post('/api/admin/notifications/read', {
      notifications: [notificationId],
    })

  const fetchProjects = async () =>
    $axios
      .get('/api/admin/projects')
      .then(({ data }) => data.projects as IProject[])

  const fetchProject = async (project: string): Promise<IProject> => {
    const projectBase = await $axios
      .get(`/api/admin/projects/${project}`)
      .then(({ data }) => data as IProjectBase)

    const changeRequestConfig = await $axios
      .get(`api/admin/projects/${project}/change-requests/config`)
      .then(({ data }) => data as IEnvironment[])

    return {
      ...projectBase,
      environments: projectBase.environments.map(
        (e: string) =>
          changeRequestConfig.find(({ environment }) => environment === e) ?? {
            environment: e,
            changeRequestEnabled: false,
          }
      ),
    }
  }

  const fetchToggle = async (
    project: string,
    feature: string
  ): Promise<IToggle> =>
    $axios
      .get(`/api/admin/projects/${project}/features/${feature}`)
      .then(({ data }) => data as IToggle)

  const flipToggle = async (
    project: string,
    environment: string,
    toggle: string,
    enabled: boolean
  ) =>
    $axios.post(
      `/api/admin/projects/${project}/features/${toggle}/environments/${environment}/${
        enabled ? 'on' : 'off'
      }`
    )

  return {
    $axios,
    fetchNotifications,
    markNotificationAsRead,
    fetchProjects,
    fetchProject,
    fetchToggle,
    flipToggle,
  }
}
