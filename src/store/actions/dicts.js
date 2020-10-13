import * as types from "../action-types";
import { getDicts } from '@/api/dicts'
import { saveDict, takeDict } from '@/utils/dicts'

export const loadDict = (name) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    let currentDicts = takeDict(name)
    if (!currentDicts) {
      const res = await getDicts(name)
      if (res.code === 20000) {
        currentDicts = res.data.dict
      }
    }
    saveDict(name, currentDicts)
    dispatch(updateDicts(name, currentDicts))
    return resolve(currentDicts)
  })
}

export const updateDicts = (name, data) => {
  return {
    type: types.DICTS,
    name,
    data,
  }
}

