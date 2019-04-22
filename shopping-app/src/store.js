import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import { createItem, minimalizeItem, selectItem } from './lib/ItemHelper';

Vue.use(Vuex)

const api_endpoint = "http://localhost:3000";

export default new Vuex.Store({
  state: {
    usualItems: [],
    shoppingItems: [],
  },
  getters: {
    usualItems(state) {
      return state.usualItems;
    },
    shoppingItems(state) {
      return state.shoppingItems;
    }
  },
  mutations: {
    setUsualItems(state, items) {
      for (const item of items) {
        state.usualItems.push(item);
      }
    },
    setShoppingItems(state, items) {
      for (const item of items) {
        state.shoppingItems.push(item);
      }
    },
    removeUsualItem(state, item) {
      var i = selectItem(item, state.usualItems);
      state.usualItems.splice(i, 1);
    },
    removeShoppingItem(state, item) {
      var i = selectItem(item, state.shoppingItems);
      state.shoppingItems.splice(i, 1);
    },
    addUsualItem(state, item) {
      state.usualItems.push(item);
    },
    addShoppingItem(state, item) {
      state.shoppingItems.push(item);
    },
    setShoppingItem(state, item) {
      var i = selectItem(item, state.shoppingItems);
      state.shoppingItems[i] = item;
    },
    completeUsualItem(state, item) {
      var i = selectItem(item, state.usualItems);
      state.usualItems[i].id = item.id;
    },
    completeShoppingItem(state, item) {
      var i = selectItem(item, state.shoppingItems);
      state.shoppingItems[i].id = item.id;
    }
  },
  actions: {
    loadUsualItems(context) {
      axios.get(api_endpoint + "/api/usual-item").then(res => context.commit("setUsualItems", res.data));
    },
    loadShoppingItems(context) {
      axios.get(api_endpoint + "/api/shopping-item").then(res => context.commit("setShoppingItems", res.data));
    },
    removeUsualItem(context, item) {
      var minItem = minimalizeItem(item);

      context.commit("removeUsualItem", minItem);
      axios.delete(api_endpoint + "/api/usual-item", { data: minItem }).then(() => console.log("uitem deleted."));
    },
    removeShoppingItem(context, item) {
      var minItem = minimalizeItem(item);

      context.commit("removeShoppingItem", minItem);
      axios.delete(api_endpoint + "/api/shopping-item", { data: minItem }).then(() => console.log("sitem deleted."));
    },
    createUsualItem(context, item) {
      item = createItem(item.name, item.amount);

      context.commit("addUsualItem", item)
      axios.post(api_endpoint + "/api/usual-item", item).then(res => context.commit("completeUsualItem", res.data));
    },
    createShoppingItem(context, item) {
      item = createItem(item.name, item.amount);

      context.commit("addShoppingItem", item)
      axios.post(api_endpoint + "/api/shopping-item", item).then(res => context.commit("completeShoppingItem", res.data));
    },
    updateShoppingItem(context, item) {
      axios.put(api_endpoint + "/api/shopping-item", item);
    },
    updateUsualItem(context, item) {
      axios.put(api_endpoint + "/api/usual-item", item);
    }
  }
})
