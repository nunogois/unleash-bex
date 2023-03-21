<template>
  <q-page class="tooltip col flex items-stretch justify-evenly">
    <div class="column" v-if="loading">
      <div class="flex q-mx-auto q-my-auto">
        <q-spinner color="primary" size="xl" />
      </div>
    </div>
    <div class="column full-width" v-else>
      <div class="row q-px-sm justify-between items-center">
        <a
          :href="`${session.settings.url}/projects/${project}/features/${feature}`"
          target="_blank"
          class="link"
          ><h1 class="text-subtitle1 q-px-sm col">{{ toggle?.name }}</h1></a
        >
      </div>
      <q-separator />
      <div class="col q-px-sm justify-center overflow-auto">
        <FeatureToggle
          v-for="environment in toggle?.environments"
          :key="environment.name"
          :project="toggleProject!"
          :environment="environment"
          :toggle="toggle!"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from 'src/api/api'
import { useSession } from 'src/stores/session'
import { IProject, IToggle } from 'src/api/models'
import FeatureToggle from 'src/components/FeatureToggleComponent.vue'

const route = useRoute()
const session = useSession()

const { project, feature } = route.query

const loading = ref(true)
const toggle = ref<IToggle>()
const toggleProject = ref<IProject>()

const loadToggle = async (projectId: string, toggleName: string) => {
  try {
    toggle.value = await api(
      session.settings.url,
      session.settings.token
    ).fetchToggle(projectId, toggleName)

    toggleProject.value = {
      ...(await api(session.settings.url, session.settings.token).fetchProject(
        projectId
      )),
      id: projectId,
    }

    loading.value = false
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

onMounted(() => {
  loading.value = true
  loadToggle(project as string, feature as string)
})
</script>
