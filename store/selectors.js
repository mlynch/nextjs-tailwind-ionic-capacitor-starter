import { createSelector } from 'reselect';

const getState = state => state;

export const getMenuOpen = createSelector(getState, state => state.menuOpen);
export const getNotificationsOpen = createSelector(getState, state => state.notificationsOpen);
export const getCurrentPage = createSelector(getState, state => state.currentPage);

// App specific selectors
export const getHomeItems = createSelector(getState, state => state.homeItems);
export const getLists = createSelector(getState, state => state.lists);
export const getSettings = createSelector(getState, state => state.settings);
