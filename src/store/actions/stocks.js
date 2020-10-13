import {
  saveFinalDealDate, takeFinalDealDate,
  saveUsetoStocks, takeUsetoStocks
} from '@/utils/stocks'
import { takeDict } from '@/utils/dicts'
import { getFinalDealDate } from '@/api/stocks'
// import { setToken, removeToken } from "@/utils/auth";
import * as types from "../action-types";

// export const loadKline = (stock) => (dispatch) => {
//   return new Promise(async (resolve, reject) => {
//     const res = await getKline(stock)
//     resolve(res.data)
//   })
// }

// export const loadDealline = (date, stock) => (dispatch) => {
//   return new Promise(async (resolve, reject) => {
//     const res = await getDeals(date, stock)
//     resolve(res.data)
//   })
// }

export const loadFinalDealDate = () => async (dispatch) => {
  let storeDate = takeFinalDealDate()
  if (!storeDate) {
    const res = await getFinalDealDate()
    if (res.code === 20000) {
      storeDate = res.data.date
    }
  }
  saveFinalDealDate(storeDate)
  return dispatch(updateFinalDealDate(storeDate))
}

export const updateUsetoStocks = ({ stock }) => {
  let code = stock || ''
  if (code.length !== 6) {
    const name_code = takeDict('name_code') || {}
    code = name_code[code]
  }
  if (code) saveUsetoStocks(code)
  return {
    type: types.STOCK_USETOSTOCKS,
    usetoStocks: takeUsetoStocks()
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
