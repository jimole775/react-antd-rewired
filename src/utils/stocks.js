const finalDealDate = 'FINALDEALDATE'
const usetoStock = 'USETOSTOCK'

export function takeFinalDealDate () {
  return sessionStorage.getItem(finalDealDate)
}

export function saveFinalDealDate (date) {
  return sessionStorage.setItem(finalDealDate, date)
}

export function removeFinalDealDate () {
  return sessionStorage.removeItem(finalDealDate)
}

export function saveUsetoStocks (code) {
  const stocks = takeUsetoStocks() || []
  if (!stocks.includes(code)) {
    stocks.unshift(code)
    if (stocks.length > 20) stocks.pop()
    localStorage.setItem(usetoStock, JSON.stringify(stocks))
  }
}

export function takeUsetoStocks () {
  return JSON.parse(localStorage.getItem(usetoStock) || 'null')
}

export function removeUsetoStocks (code) {
  if (code) {
    const stocks = takeUsetoStocks()
    const codeIndex = stocks.indexOf(code)
    if (codeIndex !== -1) {
      localStorage.setItem(usetoStock, JSON.stringify(stocks.splice(codeIndex, 1)))
    }
  } else {
    sessionStorage.removeItem(usetoStock)
  }
}
