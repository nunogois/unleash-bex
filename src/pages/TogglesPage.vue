<template>
  <q-page class="col q-pa-md items-center justify-evenly">
    <div class="column">
      <div class="row q-py-xs q-px-md justify-between items-center">
        <h1 class="text-subtitle1 col">Toggles</h1>
        <q-select
          v-if="session.projects.length > 0"
          dense
          borderless
          v-model="selectedProjectOption"
          :options="
            session.projects.map(({ id, name }) => ({ label: name, value: id }))
          "
        />
        <q-select
          v-if="selectedProject"
          dense
          borderless
          v-model="selectedEnvironmentOption"
          :options="
            selectedProject.environments.map(({ environment }) => environment)
          "
        />
      </div>
      <q-separator />
      <div
        v-if="selectedProject?.features?.length"
        class="q-pa-sm col justify-center overflow-auto"
      >
        <Toggle
          v-for="toggle in selectedProject?.features?.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )"
          :key="toggle.name"
          :project="selectedProject"
          :environment="selectedEnvironmentOption"
          :toggle="toggle"
        />
      </div>
      <div class="flex q-mx-auto q-my-auto" v-else>
        <q-spinner v-if="loading" color="primary" size="xl" />
        <p v-else>
          {{
            selectedProjectOption
              ? `No toggles found for project "${selectedProjectOption.label}".`
              : session.projects.length
              ? 'Please select a project.'
              : 'No projects found.'
          }}
        </p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { api } from 'src/api/api'
import Toggle from 'src/components/ToggleComponent.vue'
import { IProject } from 'src/api/models'
import { useSession } from 'src/stores/session'

const session = useSession()

const loading = ref(true)
const selectedProjectOption = ref({ label: 'Default', value: 'default' })
const selectedProject = ref<IProject | undefined>(undefined)
const selectedEnvironmentOption = ref('development')

watch(
  () => selectedProjectOption.value,
  async (projectOption) => {
    if (projectOption) {
      loading.value = true
      selectedProject.value = await loadProject(projectOption.value)
    }
  }
)

const loadProjects = async () => {
  try {
    const projects = await api(
      session.settings.url,
      session.settings.token
    ).fetchProjects()

    const defaultProjectOption =
      projects?.find(({ id }) => id === 'default') ?? session.projects[0]
    if (defaultProjectOption) {
      selectedProjectOption.value = {
        label: defaultProjectOption.name,
        value: defaultProjectOption.id,
      }
    }

    session.$patch({
      projects,
    })

    if (selectedProjectOption.value) {
      loadProject(selectedProjectOption.value.value)
    }
  } catch (e) {
    console.error(e)
  }
}

const loadProject = async (projectId: string) => {
  try {
    const project = await api(
      session.settings.url,
      session.settings.token
    ).fetchProject(projectId)

    const projects = session.projects.map((p) =>
      p.id === projectId ? { ...p, ...project } : p
    ) as IProject[]

    session.$patch({
      projects,
    })

    loading.value = false
    return projects.find(({ id }) => id === projectId)
  } catch (e) {
    console.error(e)
  }
  loading.value = false
}

onMounted(() => {
  loading.value = true
  loadProjects()
})
</script>
