import { combineReducers } from "redux";
import post from "./reducers/post";
import Reducer from "./reducers/reducer";
import auth from "./reducers/auth";
import inbox from "./reducers/Inbox";
import feed from "./reducers/feed";
import singlePost from "./reducers/singlePost";

export const reducers = combineReducers({ singlePost, feed, inbox, auth, post, Reducer });
