<template>
  <q-layout view="hHh lpr fFf">
    <q-header class="text-black">
      <q-toolbar class="justify-between">
        <a href="https://www.getunleash.io/" target="_blank" class="flex">
          <img
            src="https://www.getunleash.io/logos/unleash_pos.svg"
            height="34"
          />
        </a>
        <a
          href="https://www.github.com/nunogois/unleash-bex"
          target="_blank"
          class="flex"
        >
          <q-icon name="fa-brands fa-github" size="sm" class="cursor-pointer" />
        </a>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-grey-8">
      <q-tabs dense no-caps indicator-color="transparent" active-color="black">
        <q-route-tab
          to="/"
          name="notifications"
          icon="fa-solid fa-bell"
          :disable="!session.settings.valid"
        />
        <q-route-tab
          to="/toggles"
          name="toggles"
          icon="fa-solid fa-toggle-on"
          :disable="!session.settings.valid"
        />
        <q-route-tab to="/settings" name="settings" icon="fa-solid fa-cog" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useSession } from 'stores/session'

const session = useSession()
</script>

<style lang="sass">
a
  text-decoration: none
  color: inherit
.q-header
  background-color: $unleash-bg
.q-page-container
  background-color: $unleash-bg-inner
.q-footer
  background-color: $unleash-bg
  .q-icon
    font-size: 1.125rem
</style>
