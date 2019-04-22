<template>
  <form class="item-text-editor item-style item-offset" v-on:submit.prevent="itemSubmit">
    <input type="text" v-model="itemName" placeholder="Bezeichnung eingeben"/>
    <button>
      <img src="@/assets/addIcon.svg" alt="">
    </button>
  </form>
</template>

<script>
export default {
  name: 'ItemTextEditor',
  props: {

  },
  data() {
    return {
      itemName: ''
    }
  },
  methods: {
    itemSubmit() {
      if (this.itemName)
      {
        this.$emit('itemCreated', this.itemName)
        this.itemName = '';
      }
    }
  },
}
</script>

<style scoped lang="scss">

  @import "../scss/item.scss";

  input[type="text"] {
    flex-grow: 8;
    padding: 0 0 0 2rem;
    font-size: 1rem;
  }
  button {
    flex-grow: 1;

    &:hover {
      background-color: $color_item_accent;
    }

    img {
      display: inline-block;
      vertical-align: middle;
      height: 2rem;
    }
  }
</style>
