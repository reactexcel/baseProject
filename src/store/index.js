import { combineReducers } from "redux";
import post from "./reducers/post";
import Reducer from "./reducers/reducer";
import auth from "./reducers/auth";
import inbox from "./reducers/Inbox";
import feed from "./reducers/feed";
import singlePost from "./reducers/singlePost";
import singleCard from "./reducers/singleCard";

export const reducers = combineReducers({ singleCard, singlePost, feed, inbox, auth, post, Reducer });
