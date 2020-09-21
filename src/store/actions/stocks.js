import { setFinalDealDate, getFinalDealDate } from '@/utils/stocks'
import { getDeals, getKline, postFinalDealDate } from '@/api/stocks'
// import { setToken, removeToken } from "@/utils/auth";
import * as types from "../action-types";

export const loadKline = (stock) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    // if (!stock) reject('loadKline stock 是必要参数！')
    const res = await getKline(stock)
    // dispatch(updateKline(date, stock, res.data))
    resolve(res.data)
  })
}

export const loadDealline = (date, stock) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    // if (!date || !stock) reject('loadDealline date,stock 是必要参数！')
    const res = await getDeals(date, stock)
    // dispatch(updateDeal(date, stock, res.data))
    resolve(res.data)
  })
}

export const loadFinalDealDate = () => async (dispatch) => {
  const storeDate = getFinalDealDate()
  if (storeDate) return dispatch(updateFinalDealDate(storeDate))
  const res = await postFinalDealDate()
  if (res.code === 20000) {
    setFinalDealDate(res.data.date)
    dispatch(updateFinalDealDate(res.data.date))
  }
}

export const updateKline = ({ stock }) => {
  return {
    type: types.STOCK_KLINE,
    stock
  }
}

export const updateDeal = ({ date, stock }) => {
  return {
    type: types.STOCK_DEALLINE,
    date, stock
  }
}

export const updateFinalDealDate = date => {
  return {
    type: types.STOCK_FINALDEALDATE,
    date
  }
}
