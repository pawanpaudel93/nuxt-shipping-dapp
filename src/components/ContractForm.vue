<template>
  <v-form style="display: inline-block">
    <v-btn rounded color="primary" @click="runMethod">Submit</v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ContractForm',
  props: {
    method: {
      type: String,
      required: true,
    },
  },
  methods: {
    runMethod() {
      this.$store.dispatch('runMethod', this.method)
    },
  },
})
</script>