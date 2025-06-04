import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Color } from '../types/snackbar.types'

export const useAppState = defineStore('appState', () => {
  const isLoading = ref(false)

  const isSnackbarVisible = ref(false)
  const snackbarMessage = ref('')
  const snackbarColor: Ref<Color> = ref('red')
  const snackbarTimeout = ref(5000)

  function setLoading(value: boolean) {
    isLoading.value = value
  }
  function showSnackbar(color: Color, message = '', timeout = 5000) {
    isSnackbarVisible.value = true
    snackbarColor.value = color
    snackbarMessage.value = message
    snackbarTimeout.value = timeout
  }

  return {
    isLoading,
    setLoading,
    isSnackbarVisible,
    snackbarMessage,
    snackbarColor,
    snackbarTimeout,
    showSnackbar,
  }
})
