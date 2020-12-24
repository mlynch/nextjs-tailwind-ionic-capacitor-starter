import { createSelector } from 'reselect';

const getState = state => state;

export const getMenuOpen = createSelector(getState, state => state.menuOpen);
export const getNotificationsOpen = createSelector(getState, state => state.notificationsOpen);
export const getCurrentPage = createSelector(getState, state => state.currentPage);
export const getTabs = createSelector(getState, state => state.tabs);
export const getMenuLinks = createSelector(getState, state => state.menuLinks);
export const getPages = createSelector(getState, state => state.pages);

// App specific selectors
export const getHomeItems = createSelector(getState, state => state.homeItems);
export const getLists = createSelector(getState, state => state.lists);
export const getSelectedList = createSelector(getState, state => state.selectedList);
