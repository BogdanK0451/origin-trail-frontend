<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>Ethereum Transaction Crawler</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.path"
          link>
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <router-view />
      <v-snackbar
        v-model="isSnackbarVisible"
        class="custom-snackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
        multi-line>
        {{ $t(snackbarMessage) }}
        <template #actions>
          <v-btn
            variant="text"
            class="text-white"
            @click="isSnackbarVisible = false">
            {{ $t('snackbar.close') }}
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppState } from './stores/appState'

const { t } = useI18n()

const { isSnackbarVisible, snackbarMessage, snackbarColor, snackbarTimeout } = storeToRefs(useAppState())

const navItems = computed(() => [
  {
    title: t('nav.transactions'),
    path: '/',
    icon: 'mdi-swap-vertical-circle',
  },
  {
    title: t('nav.balance'),
    path: '/balance',
    icon: 'mdi-chart-bar',
  },
  // {
  //   title: t('nav.tokenTransactions'),
  //   path: '/tokentransactions',
  //   icon: 'mdi-hexagon-multiple',
  // },
])
</script>
