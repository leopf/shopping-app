<template>
  <div class="s-item-display item-style">
    <input class="item-name" v-on:change="updateRequired" v-on:keydown="valueChanged" type="text" v-model="item.name" placeholder="Bezeichnung eingeben">
    <input class="item-amount" v-on:change="updateRequired" v-on:keydown="valueChanged" type="text" v-model="item.amount" placeholder="Menge eingeben">
    <div class="item-slide-right">
      <div v-on:click="deleteItem"></div>
    </div>
    <div class="item-slide-left" v-if="allowCreate">
      <div v-on:click="createItem"></div>
    </div>
  </div>
</template>

<script>

import UpdateTimer from '../lib/UpdateTimer';
import UpdateChecker from '../lib/UpdateChecker';

export default {
  name: 'ItemDisplay',
  props: {
    item: Object,
    allowCreate: Boolean
  },
  data() {
    return {
      updateTimer: new UpdateTimer(500, this.updateRequired),
      updateChecker: new UpdateChecker(this.item)
    }
  },
  methods: {
    valueChanged() {
      this.updateTimer.setChanged();
    },
    updateRequired() {
      if (this.updateChecker.checkChanged(this.item)) {
        this.$emit('updated', this.item)
      }
    },
    deleteItem() {
      this.$emit('deleted', this.item)
    },
    createItem() {
      this.$emit('createItem', this.item)
    }
  },
}
</script>

<style scoped lang="scss">

@import "../scss/item.scss";

.item-style {
  position: relative;
  .item-name {
    flex-grow: 15;
    padding: 0 0 0 2rem;
    font-size: 1rem;
  }
  .item-amount {
    flex-grow: 1;
    margin: 0 2rem 0 0;
    text-align: center;
    font-size: 0.8rem;
    align-self: center;
    background-color: black;
    padding: 0.2rem 0.5rem;
    color: white;
    border-radius: 0.4rem;

    &::placeholder {
      color: #bbbbbb;
    }
  }

  .item-slide-left {
    left: 0;
    div {
      transition: right 0.5s;  
      background-color: rgb(0, 0, 177);
      right: 100%;
    }
    &:hover {
      div {
        right: 0;
      }
    }
  }
  .item-slide-right {
    right: 0;
    div {
      transition: left 0.5s;  
      background-color: rgb(177, 0, 0);
      left: 100%;
    }
    &:hover {
      div {
        left: 0;
      }
    }
  }

  .item-slide-right, .item-slide-left {
    position: absolute;
    height: 100%;
    top: 0;
    width: 1rem;

    div {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      cursor: pointer;
    }
  }
}
</style>
