<template>
  <q-page class="col q-pa-md items-center justify-evenly">
    <div class="column">
      <div class="q-py-xs q-px-md">
        <h1 class="text-subtitle1">Notifications</h1>
      </div>
      <q-separator />
      <div
        v-if="session.notifications.length"
        class="q-pa-sm col justify-center overflow-auto"
      >
        <Notification
          v-for="notification in session.notifications.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )"
          :key="notification.id"
          :notification="notification"
        />
      </div>
      <div class="flex q-mx-auto q-my-auto" v-else>
        <q-spinner v-if="loading" color="primary" size="xl" />
        <p v-else>No notifications found.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { api } from 'src/api/api'
import Notification from 'src/components/NotificationComponent.vue'
import { useSession } from 'stores/session'
import { onMounted, ref } from 'vue'

const session = useSession()

const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    const notifications = await api(
      session.settings.url,
      session.settings.token
    ).fetchNotifications()
    session.$patch({ notifications })
  } catch (e) {
    console.error(e)
  }
  loading.value = false
})
</script>
