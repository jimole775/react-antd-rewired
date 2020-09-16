import * as types from "../action-types";
const initState = {
  kline: {},
  deal: {}
}
export default function stocks (state = initState, action) {
  console.log('stocks:', action, state)
  switch (action.type) {
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
    default:
      return state
  }
}