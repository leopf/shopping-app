<template>
  <div id="app">
    <h1>Oft benötigte Waren</h1>
    <item-text-editor v-on:itemCreated="createUsualItemW"/>
    <ItemDisplay v-for="ui in usualItems" v-bind:key="ui.id" v-bind:item="ui" v-bind:allowCreate="true" v-on:deleted="removeUsualItem" v-on:updated="updateUsualItem" v-on:createItem="createShoppingItemFromUsual"/>
    <h1>Einkaufsliste</h1>
    <item-text-editor v-on:itemCreated="createShoppingItemW"/>
    <ItemDisplay v-for="si in shoppingItems" v-bind:key="si.id" v-bind:item="si" v-on:deleted="removeShoppingItem" v-on:updated="updateShoppingItem"/>
  </div>
</template>

<script>
import ItemTextEditor from './components/ItemTextEditor.vue'
import ItemDisplay from './components/ItemDisplay.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    ItemTextEditor,
    ItemDisplay
  },
  methods: {
    createShoppingItemFromUsual(item) {
      this.createShoppingItem(item);
    },
    createShoppingItemW(name) {
      this.createShoppingItem({ name: name, amount: '' });
    },
    createUsualItemW(name) {
      this.createUsualItem({ name: name, amount: '' });
    },
    ...mapActions([
      'loadUsualItems',
      'loadShoppingItems',
      'createUsualItem',
      'createShoppingItem',
      'updateUsualItem',
      'updateShoppingItem',
      'removeUsualItem',
      'removeShoppingItem'
    ])
  },
  computed: {
    ...mapGetters([
      'usualItems',
      'shoppingItems'
    ])
  },
  created() {
    this.loadUsualItems();
    this.loadShoppingItems();
  }
}
</script>

<style lang="scss">
body {
  margin:  0;
  font-family: 'montserrat';
  background-color: #f3f3f3;

  input {
    font-family: 'montserrat';
  }
}
#app {
  margin: 0 20%;

  h1 {
    margin: 2.5rem 0 1.5rem 0;
    font-weight: 800;
  }
}
</style>
