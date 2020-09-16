import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import settings from "./settings";
import tagsView from "./tagsView";
import monitor from "./monitor";
import stocks from "./stocks";

export default combineReducers({
  user,
  app,
  settings,
  tagsView,
  stocks,
  monitor
});
