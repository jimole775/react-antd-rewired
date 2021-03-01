import * as types from "../action-types";
const initState = {
  currentStock: '',
  finalDealDate: '',
  usetoStocks: [],
  kline: {},
  deal: {}
}
export default function stocks (state = initState, action) {
  switch (action.type) {
    case types.STOCK_CURRENT:
      return {
        ...state,
        currentStock: action.currentStock
      }
    case types.STOCK_KLINE:
      return {
        ...state,
        kline: {
          stock: action.stock
        }
      }
    case types.STOCK_DEALLINE:
      return {
        ...state,
        deal: {
          stock: action.stock,
          date: action.date
        }
      }
    case types.STOCK_FINALDEALDATE:
      return {
        ...state,
        finalDealDate: action.date
      }
    case types.STOCK_USETOSTOCKS:
      return {
        ...state,
        usetoStocks: action.usetoStocks
      }
    default:
      return state
  }
}