import request from '@/utils/request'
import store from "@/store"
import { updateDeal, updateKline, updateUsetoStocks }  from '@/store/actions'
export async function getVline(data) {
  store.dispatch(updateDeal(data))
  store.dispatch(updateKline(data))
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/vline',
    method: 'post',
    data
  })
}

export async function getUline(data) {
  store.dispatch(updateDeal(data))
  store.dispatch(updateKline(data))
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/uline',
    method: 'post',
    data
  })
}

export async function getDeals(data) {
  store.dispatch(updateDeal(data))
  store.dispatch(updateKline(data))
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/deals',
    method: 'post',
    data
  })
}

export async function getLowerpoint(data) {
  store.dispatch(updateDeal(data))
  store.dispatch(updateKline(data))
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/lowerpoint',
    method: 'post',
    data
  })
}

export async function getDealline(data) {
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/dealline',
    method: 'post',
    data
  })
}

export async function getKline(data) {
  store.dispatch(updateUsetoStocks(data))
  return request({
    url: '/api/kline',
    method: 'post',
    data
  })
}

export async function getFinalDealDate() {
  return request({
    url: '/api/finalDealDate',
    method: 'post',
    data: ''
  })
}
