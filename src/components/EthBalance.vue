<template>
  <v-container class="bg-grey-lighten-4" height="100%">
    <v-card height="100%">
      <v-row class="mx-3 mt-5">
        <v-col cols="5">
          <v-card-title class="text-h3 pl-0 font-weight-bold">
            {{ $t('balance.title') }}
          </v-card-title>
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col>
          <v-form @submit.prevent="debouncedHandleClick">
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="address"
                  :label="$t('input.walletAdress')"
                  placeholder="e.g., 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
                  clearable
                  hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  :value="formattedDate"
                  :label="$t('input.date')"
                  readonly
                  clearable
                  hide-details="auto"
                  persistent-placeholder
                  placeholder="YYYY-MM-DD"
                  @click:clear="date = null">
                  <template #append-inner>
                    <v-menu
                      v-model="dateMenu"
                      location="end"
                      :close-on-content-click="false">
                      <template #activator="{props}">
                        <v-icon v-bind="props" class="ml-2">
                          mdi-calendar
                        </v-icon>
                      </template>
                      <v-date-picker
                        v-model="date"
                        :max="yesterday"
                        @update:model-value="dateMenu = false" />
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="2" class="d-flex align-center">
                <v-btn type="submit" color="primary" block>
                  {{ $t('input.fetchBalance') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col class="pt-0 pb-0">
          <v-divider />
        </v-col>
      </v-row>

      <v-row class="mx-5">
        <v-col class="pt-0">
          <v-progress-linear
            indeterminate
            :style="{display: 'block'}"
            color="primary"
            :class="{showBar: !isLoading}" />
        </v-col>
      </v-row>

      <v-row v-if="lastAddress" class="mx-5 mb-3">
        <v-col cols="auto">
          <v-icon start icon="mdi-wallet" class="mr-2" />
          <v-chip
            color="primary" variant="tonal" class="text-body-2"
            label>
            {{ $t('input.walletAdress') }}: {{ lastAddress }}
          </v-chip>
        </v-col>
        <v-col v-if="lastDate" cols="auto">
          <v-icon start icon="mdi-calendar" class="mr-2" />
          <v-chip
            color="primary" variant="tonal" class="text-body-2"
            label>
            {{ $t('input.date') }}: {{ lastDate }}
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-icon start icon="mdi-ethereum" class="mr-2" />
          <v-chip
            color="primary" variant="elevated" class="text-body-2"
            label>
            {{ $t('balance.ethBalance') }}: {{ ethBalance }} ETH
          </v-chip>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useAppState } from '../stores/appState'
import { storeToRefs } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import { fetchBalance } from '../api/eth'

const { isLoading } = storeToRefs(useAppState())
const { showSnackbar } = useAppState()
const { t } = useI18n()

const address = ref('0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f')
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)
const date: Ref<Date | null> = ref(yesterday)
const dateMenu = ref(false)
const ethBalance = ref('0')

const lastAddress = ref('')
const lastDate = ref('')

const formattedDate = computed(() => {
  if (!date.value) {
    return ''
  }
  const d = date.value
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})

async function handleClick() {
  if (!address.value || !date.value) {
    showSnackbar('red', t('error.invalidInput'))
    return
  }
  isLoading.value = true
  try {
    const balance = await fetchBalance(address.value, formattedDate.value)
    ethBalance.value = balance
    lastAddress.value = address.value
    lastDate.value = formattedDate.value
    showSnackbar('green', t('success.fetchSuccess'))
  } catch (err) {
    showSnackbar('red', t('error.fetchFailed'))
    ethBalance.value = '0'
  } finally {
    isLoading.value = false
  }
}

const debouncedHandleClick = useThrottleFn(handleClick, 3000)
</script>

<style scoped>
.showBar {
  display: none !important;
}
</style>
