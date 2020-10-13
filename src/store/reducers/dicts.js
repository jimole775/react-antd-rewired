import * as types from "../action-types"
const init = {
  code_name: {},
  name_code: {},
}
export default function dicts(state = init, action) {
  switch (action.type) {
    case types.DICTS:
      return {
        ...state,
        [action.name]: action.data,
      };
    default:
      return state;
  }
}
