<template>
  <q-list separator>
    <my-saying></my-saying>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import SayingComponent from './Saying.vue';

@Component({
  components: {
    "my-saying": SayingComponent
  }
})
export default class SayingListComponent extends Vue {

}
</script>


<style>
</style>
