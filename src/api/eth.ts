import axios from 'axios'
import type { EtherscanTransaction, EtherScanTransactionSimplified } from '../types/etherscan.types'

export async function fetchTransactionsFromFrontend(
  address: string,
  startBlock: string,
  page: number,
  itemsPerPage: number,
): Promise<EtherScanTransactionSimplified[]> {
  if (!address || !startBlock || !page || !itemsPerPage) {
    throw Error('input missing')
  }

  const ETHERSCAN_API = 'https://api.etherscan.io/api'
  const API_KEY = 'DZVD7UMKCTX8KJBRZBXFMDDMJBK333D1ZD' //ofcourse in practice we do calls from the backend and the api key wouldn't be exposed
  // but i'll keep this function hgere for testing purposes
  const response = await axios.get(ETHERSCAN_API, {
    params: {
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: startBlock,
      endblock: 'latest',
      sort: 'asc',
      apikey: API_KEY,
      page: page,
      offset: itemsPerPage,
    },
  })

  if (response.data.status !== '1') {
    throw Error(response.data.message)
  }

  return response.data.result.map((tx: EtherscanTransaction) => ({
    from: tx.from,
    to: tx.to,
    value: (parseInt(tx.value) / 1e18).toFixed(6),
    blockNumber: tx.blockNumber,
    hash: tx.hash,
    timeStamp: tx.timeStamp,
  }))
}

export async function fetchTransactions(
  address: string,
  startBlock: string,
  page: number,
  itemsPerPage: number,
): Promise<EtherScanTransactionSimplified[]> {
  if (!address || !startBlock || !page || !itemsPerPage) {
    throw Error('input missing')
  }
  const { data } = await axios.get<EtherScanTransactionSimplified[]>(`${import.meta.env.VITE_NODE}/transactions/${address}/${startBlock}`, {
    params: { page: page, itemsPerPage: itemsPerPage },
  })
  return data
}

export async function fetchBalance(address: string, date: string): Promise<string> {
  if (!address || !date) {
    throw Error('input missing')
  }
  const { data } = await axios.get<{ balance: string }>(`${import.meta.env.VITE_NODE}/balance/${address}/${date}`)
  return data.balance
}
