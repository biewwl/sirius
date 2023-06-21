import lS from "manager-local-storage";
import config from "../app_config.json";

const appName = config["app.name"];
const STORIES_LIST_KEY = `#####${appName}-stories-list#####`;
const STORIES_LIST_PREV_PAGE_KEY = `#####${appName}-stories-list-PREV-PAGE#####`;

const storiesList = {
  set: (list) => {
    const mappedList = list.map((story) => story.id);
    lS.set(STORIES_LIST_KEY, mappedList);
  },
  get: () => {
    return lS.get(STORIES_LIST_KEY);
  },
  getNextId: (currentId) => {
    const currentList = storiesList.get();
    const currentIndex = currentList.findIndex((id) => id === currentId);
    const nextId = currentList[currentIndex + 1];
    return nextId;
  },
  getPrevId: (currentId) => {
    const currentList = storiesList.get();
    const currentIndex = currentList.findIndex((id) => id === currentId);
    const nextId = currentList[currentIndex - 1];
    return nextId;
  },
  setPrevPage: (path) => {
    lS.set(STORIES_LIST_PREV_PAGE_KEY, path);
  },
  getPrevPage: () => {
    return lS.get(STORIES_LIST_PREV_PAGE_KEY);
  },
};

export default storiesList;
