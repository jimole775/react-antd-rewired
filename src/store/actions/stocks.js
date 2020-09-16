// import { setUserToken, resetUser } from "./user";
import { getDeals, getKline } from "@/api/stocks";
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

