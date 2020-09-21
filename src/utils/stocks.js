const finalDealDate = 'finalDealDate'

export function getFinalDealDate() {
  return sessionStorage.getItem(finalDealDate)
}

export function setFinalDealDate(token) {
  return sessionStorage.setItem(finalDealDate, token)
}

export function removeFinalDealDate() {
  return sessionStorage.removeItem(finalDealDate)
}
