const finalDealDate = 'finalDealDate'

export function takeFinalDealDate() {
  return sessionStorage.getItem(finalDealDate)
}

export function saveFinalDealDate(token) {
  return sessionStorage.setItem(finalDealDate, token)
}

export function removeFinalDealDate() {
  return sessionStorage.removeItem(finalDealDate)
}
