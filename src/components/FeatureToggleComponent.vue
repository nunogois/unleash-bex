<template>
  <div class="q-pa-sm toggle">
    <div class="row full-width items-center">
      <div class="col-grow">
        {{ environment.name }}
      </div>
      <div class="col-shrink">
        <q-toggle
          dense
          v-model="enabled"
          color="primary"
          :disable="changeRequestEnabled"
          @update:model-value="toggleFlip"
        >
          <q-tooltip v-if="changeRequestEnabled">
            Change requests are enabled in this project for the
            {{ props.environment.name }} environment. Please toggle this feature
            using Unleash.
          </q-tooltip>
        </q-toggle>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { api } from 'src/api/api'
import { IProject, IToggle } from 'src/api/models'
import { useSession } from 'src/stores/session'
import { IToggleEnvironment } from '../api/models'

interface Props {
  project: IProject
  environment: IToggleEnvironment
  toggle: IToggle
}

const props = defineProps<Props>()

const session = useSession()
const enabled = ref(props.environment.enabled)

const changeRequestEnabled = computed(
  () =>
    props.project.environments.find(
      ({ environment }) => environment === props.environment.name
    )?.changeRequestEnabled
)

const toggleFlip = (value: boolean) => {
  api(session.settings.url, session.settings.token).flipToggle(
    props.project.id,
    props.environment.name,
    props.toggle.name,
    value
  )
}
</script>

<style lang="sass">
.link
  color: $primary
  text-decoration: none
  &:hover
    text-decoration: underline
.toggle:not(:last-child)
  border-bottom: 1px solid $grey-3
</style>
