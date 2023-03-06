<template>
  <div class="notification q-pa-sm cursor-pointer" @click="notificationClick">
    <div class="row full-width">
      <div
        class="notification-badge"
        :class="{ 'is-new': !notification.readAt }"
      >
        <q-icon
          :name="
            notification.notificationType === 'change-request'
              ? 'fa-solid fa-code-pull-request'
              : notification.notificationType === 'toggle'
              ? 'fa-solid fa-toggle-off'
              : 'fa-solid fa-bell'
          "
        />
      </div>
      <div class="col">
        <p :class="{ 'text-weight-bold': !notification.readAt }">
          {{ notification.message }}
        </p>
        <div class="row justify-between items-center text-grey-8 small-text">
          <div class="row items-center">
            <q-avatar
              class="q-mr-sm"
              size="20px"
              text-color="white"
              color="grey-8"
              ><img :src="notification.createdBy.imageUrl"
            /></q-avatar>
            Created by {{ notification.createdBy.username }}
          </div>
          <p class="q-mb-none">
            {{ notification.createdAt.substring(0, 16).replace('T', ' ') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from 'src/api/api'
import { INotification } from 'src/api/models'
import { useSession } from 'src/stores/session'

const session = useSession()

interface Props {
  notification: INotification
}

const props = defineProps<Props>()

const notificationClick = () => {
  if (!props.notification.readAt) {
    session.markNotificationAsRead(props.notification.id)
    api(session.settings.url, session.settings.token).markNotificationAsRead(
      props.notification.id
    )
  }
  window.open(session.settings.url + props.notification.link, '_blank')
}
</script>

<style lang="sass">
.notification:not(:last-child)
  border-bottom: 1px solid $grey-3
.notification-badge
  background: $grey-3
  color: $grey-8
  border-radius: 20%
  width: 1.5rem
  height: 1.5rem
  display: flex
  align-items: center
  justify-content: center
  margin-right: 0.5rem
  .q-icon
    font-size: 1rem
.is-new
  background: $primary
  color: white
.small-text
  font-size: 0.75rem
</style>
