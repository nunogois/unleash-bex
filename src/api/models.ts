export interface INotification {
  id: number
  createdAt: string
  createdBy: {
    imageUrl: string
    username: string
  }
  link: string
  message: string
  notificationType: string
  readAt?: string
}

export interface IProjectBase {
  id: string
  name: string
  description: string
  environments: string[]
  features: IToggle[]
}

export interface IProject extends Omit<IProjectBase, 'environments'> {
  environments: IEnvironment[]
}

export interface IToggleEnvironment {
  name: string
  enabled: boolean
}

export interface IToggle {
  name: string
  type: string
  createdAt: string
  environments: IToggleEnvironment[]
}

export interface IEnvironment {
  environment: string
  changeRequestEnabled: boolean
}
