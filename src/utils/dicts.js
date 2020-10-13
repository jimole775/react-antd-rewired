const dictsuffix = 'dicts'
export function saveDict (name, data) {
  localStorage.setItem(`${dictsuffix}_${name}`, JSON.stringify(data))
}

export function takeDict (name) {
  return JSON.parse(localStorage.getItem(`${dictsuffix}_${name}`) || 'null')
}

export function removeDict (name) {
  sessionStorage.removeItem(`${dictsuffix}_${name}`)
}
