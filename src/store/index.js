import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import * as getters from "./getters";
import * as actions from "./action";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    // sequenceList: [],
    currentIndex: -1
  },
  mutations: {
    [types.SET_SINGER](state, singer) {
      state.singer = singer;
    },
    [types.SET_PLAYING_STATE](state, flag) {
      state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
      state.fullScreen = flag;
    },
    [types.SET_PLAYINGLIST](state, list) {
      state.playList = list;
    },
    [types.SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index;
    }
  },
  actions,
  modules: {},
  getters
});
