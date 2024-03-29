import * as types from "./mutation-types";

export const selectPlay = function({ commit, state }, { list, index }) {
  commit(types.SET_PLAYINGLIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
};
