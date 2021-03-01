import { login, logout } from "./auth";
import { getUserInfo, setUserToken, setUserInfo, resetUser } from "./user";
import { toggleSiderBar, toggleSettingPanel } from "./app";
import { changeSetting } from "./settings";
import { addTag, emptyTaglist, deleteTag, closeOtherTags } from "./tagsView";
import { addBug } from "./monitor";
import { updateKline, updateDeal, loadFinalDealDate, updateUsetoStocks, loadUsetoStocks, updateCurrentStock } from "./stocks";
import { loadDict, updateDicts } from "./dicts";

export {
  login,
  logout,
  getUserInfo,
  setUserToken,
  setUserInfo,
  resetUser,
  toggleSiderBar,
  toggleSettingPanel,
  changeSetting,
  addTag,
  emptyTaglist,
  deleteTag,
  closeOtherTags,
  updateKline, updateDeal, loadFinalDealDate, updateUsetoStocks, loadUsetoStocks, updateCurrentStock,
  loadDict, updateDicts,
  addBug
};
