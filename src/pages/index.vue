<template>
  <v-container fluid>
    <div class="App">
      <div class="section">
        <h2>Shipping Test</h2>
        <h3>
          <strong>Shipping Status 1-Shipped 2-Delivered </strong>
          <strong>Ship State: {{ shipStatus }}</strong>
        </h3>
        <p>
          <strong>Total number of updates: {{ numUpdates }}</strong>
        </p>
        <p>
          <strong>Ship: </strong>
          <contract-form method="Shipped"></contract-form>
        </p>
        <p>
          <strong>Deliver: </strong>
          <contract-form method="Delivered"></contract-form>
        </p>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ContractForm from '../components/ContractForm.vue'
export default Vue.extend({
  components: {
    ContractForm,
  },
  computed: {
    ...mapGetters({
      numUpdates: 'numUpdates',
      shipStatus: 'shipStatus',
    }),
  },
  mounted() {
    ;(window as any).ethereum.enable()
    this.$store.dispatch('getAccounts')
    this.$store.dispatch('getShipStatus')
    this.$store.dispatch('getNumUpdates')
  },
})
</script>

<style>
strong {
  display: inline-block;
}
</style>

