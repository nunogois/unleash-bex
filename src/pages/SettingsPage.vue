<template>
  <q-page class="col q-pa-md items-center justify-evenly">
    <div>
      <div class="q-py-xs q-px-md">
        <h1 class="text-subtitle1">Settings</h1>
      </div>
      <q-separator />
      <div class="q-py-md q-px-md col q-gutter-y-md justify-center">
        <q-input v-model="url" label="Unleash URL" outlined dense />
        <q-input v-model="token" label="Token" outlined dense />
        <p>
          Token not required. Even if specified, Unleash current session cookie
          always takes precedence over it.
        </p>
        <q-input
          v-model="refreshInterval"
          type="number"
          label="Notification refresh interval (s)"
          outlined
          dense
        />
        <div class="row justify-end">
          <q-btn
            color="primary"
            label="Save"
            no-caps
            :loading="loading"
            @click="save"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { api } from 'src/api/api'
import { ref } from 'vue'
import { useSession } from 'stores/session'
import { INotification } from 'src/api/models'

const $q = useQuasar()
const session = useSession()

const url = ref(session.settings.url)
const token = ref(session.settings.token)
const refreshInterval = ref(session.settings.refreshInterval ?? 10)

const loading = ref(false)

const save = async () => {
  let valid = false
  let notifications: INotification[] = []
  loading.value = true

  url.value = url.value.replace(/\/$/, '')

  try {
    notifications = await api(url.value, token.value).fetchNotifications()
    valid = true

    $q.notify({
      message: 'Settings saved!',
      type: 'positive',
    })
  } catch (e) {
    console.error(e)

    $q.notify({
      message:
        'Unable to validate settings. Make sure you are using Unleash Enterprise v4.22 or above' +
        (token.value ? '.' : ' and you are currently logged in.'),
      type: 'negative',
    })
  }

  session.$patch({
    notifications,
    settings: {
      url: url.value,
      token: token.value,
      refreshInterval: refreshInterval.value,
      valid,
    },
  })

  loading.value = false
}
</script>
