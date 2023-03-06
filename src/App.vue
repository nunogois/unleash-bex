<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar, LocalStorage } from 'quasar'
import { useSession } from 'stores/session'

const $q = useQuasar()
const session = useSession()

$q.bex.on('update_notifications', ({ data, respond }) => {
  session.$patch({ notifications: data.notifications })
  respond()
})

session.$subscribe(async (_, session) => {
  $q.bex.send(
    'update_read_notifications_badge',
    session.notifications.filter(({ readAt }) => !readAt).length
  )
  LocalStorage.set('session', session)
})
</script>
