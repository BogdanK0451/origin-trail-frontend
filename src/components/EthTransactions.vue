<template>
  <v-container class="bg-grey-lighten-4" height="100%">
    <v-card height="100%">
      <v-row class="mx-3 mt-5">
        <v-col cols="5">
          <v-card-title class="text-h3 pl-0 font-weight-bold">
            {{ $t('home.transactions') }}
          </v-card-title>
        </v-col>
      </v-row>
      <v-row class="mx-5">
        <v-col>
          <v-form @submit.prevent="debouncedHandleClick">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="address"
                  :label="$t('input.walletAdress')"
                  placeholder="e.g., 0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f"
                  clearable
                  hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="startBlock"
                  :label="$t('input.startBlock')"
                  type="number"
                  placeholder="9000000"
                  clearable
                  hide-details />
              </v-col>
              <v-col cols="2" class="d-flex align-center">
                <v-btn
                  type="submit" color="primary" block>
                  {{ $t('input.fetch') }}
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
            :style="{display: 'block'}" color="primary" :class="{'showBar': !isLoading}" />
        </v-col>
      </v-row>
      <v-row v-if="lastAddress" class="mx-5 mb-2 ">
        <v-col cols="auto">
          <v-icon start icon="mdi-wallet" class="mr-2" />
          <v-chip
            color="primary" variant="tonal" class="text-body-2"
            label>
            {{ $t('input.walletAdress') }}: {{ lastAddress }}
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-icon start icon="mdi-cube-scan" class="mr-2" />
          <v-chip
            color="primary" variant="tonal" class="text-body-2"
            label>
            {{ $t('input.startBlock') }}: {{ lastStartBlock }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row class="mx-5 mb-2">
        <v-col>
          <v-card :class="{'disable-next': disableNext}">
            <v-data-table-server
              :footer-props="{disableNext: true, disableLast: true}"

              :items-per-page="itemsPerPage"
              :items-per-page-options="itemsPerPageOptions"
              :page="page"
              style="height: 71vh"
              :headers="headers"
              :items-per-page-text="$t('table.transactionsPerPage')"
              :page-text="`${$t('table.page')} ${page} (${pageRange})`"
              :items="transactions"
              :hide-default-footer="!hasFetched"
              @update:options="handlePageChange">
              <template #headers="{columns}">
                <tr>
                  <th v-for="column in columns" :key="column.key">
                    <v-icon v-if="column.key === 'from'" size="small" class="mr-1">
                      mdi-arrow-top-right
                    </v-icon>
                    <v-icon v-else-if="column.key === 'to'" size="small" class="mr-1">
                      mdi-arrow-bottom-left
                    </v-icon>
                    <v-icon v-else-if="column.key === 'value'" size="small" class="mr-1">
                      mdi-ethereum
                    </v-icon>
                    <v-icon v-else-if="column.key === 'blockNumber'" size="small" class="mr-1">
                      mdi-cube-scan
                    </v-icon>
                    <v-icon v-else-if="column.key === 'hash'" size="small" class="mr-1">
                      mdi-link
                    </v-icon>
                    <v-icon v-else-if="column.key === 'timeStamp'" size="small" class="mr-1">
                      mdi-clock-time-four
                    </v-icon>
                    {{ t(`table.${column.key}`) }}
                  </th>
                </tr>
              </template>
              <template #item.blockNumber="{item}">
                <a :href="`https://etherscan.io/block/${item.blockNumber}`" target="_blank">
                  {{ item.blockNumber }}
                </a>
              </template>
              <template #item.hash="{item}">
                <a :href="`https://etherscan.io/tx/${item.hash}`" target="_blank">
                  {{ item.hash.slice(0, 30) }}...
                </a>
              </template>
              <template #item.timeStamp="{item}">
                {{ new Date(Number(item.timeStamp) * 1000).toLocaleString('sr-RS') }}
              </template>
            </v-data-table-server>
          </v-card>
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
import { fetchTransactions } from '../api/eth'
import type { EtherScanTransactionSimplified } from '../types/etherscan.types'

const { isLoading } = storeToRefs(useAppState())
const { showSnackbar } = useAppState()

const { t } = useI18n()

const address = ref('0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f')
const startBlock = ref('9000000')
const transactions: Ref<EtherScanTransactionSimplified[]> = ref([])
const page = ref(1)

const lastAddress = ref('')
const lastStartBlock = ref('')

const hasFetched = ref(false)

const itemsPerPage = ref(25)
const itemsPerPageOptions = ref([
  { value: 10, title: '10' },
  { value: 25, title: '25' },
  { value: 50, title: '50' },
  { value: 100, title: '100' },
  { value: 1000, title: '1000' },
])
const disableNext = computed(() => {
  return transactions.value.length < itemsPerPage.value && page.value > 1
})

const headers = [
  { title: t('table.from'), key: 'from' },
  { title: t('table.to'), key: 'to' },
  { title: t('table.value'), key: 'value' },
  { title: t('table.blockNumber'), key: 'blockNumber' },
  { title: t('table.hash'), key: 'hash' },
  { title: t('table.timeStamp'), key: 'timeStamp' },
]

const pageRange = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value + 1
  const end = page.value * itemsPerPage.value
  return `${start}–${end}`
})

async function handleClick() {
  isLoading.value = true

  try {
    transactions.value = await fetchTransactions(address.value, startBlock.value, page.value, itemsPerPage.value)
    hasFetched.value = true
    if (address.value !== lastAddress.value || startBlock.value !== lastStartBlock.value) {
      page.value = 1
      lastAddress.value = address.value
      lastStartBlock.value = startBlock.value
    }
  } catch (err) {
    showSnackbar('red', t('error.fetchFailed'))
  } finally {
    isLoading.value = false
  }
}

function handlePageChange({ page: newPage, itemsPerPage: newItemsPerPage }: { page: number; itemsPerPage: number }) {
  if (page.value !== newPage || itemsPerPage.value !== newItemsPerPage) {
    page.value = newPage
    itemsPerPage.value = newItemsPerPage
    handleClick()
  }
}

const debouncedHandleClick = useThrottleFn(handleClick, 3000)
</script>

<style scoped>
.footer-style {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 24px;
  justify-content: flex-end;
  height: 50px;
}
.showBar {
  display: none !important;
}
</style>