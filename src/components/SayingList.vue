<template>
  <q-list separator>
    <q-toolbar inverted color="primary">
      <q-toolbar-title>HPDell的 {{ sayingList.length }} 篇微文</q-toolbar-title>
      <q-btn flat round icon="add"></q-btn>
    </q-toolbar>
    <template v-if="sayingList.length > 0">
      <my-saying v-for="sayingID in sayingList" :key="sayingID" :id="sayingID"></my-saying>
    </template>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import SayingComponent from './Saying.vue';
import Axios from 'axios';

@Component({
  components: {
    "my-saying": SayingComponent
  }
})
export default class SayingListComponent extends Vue {
  sayingList: string[] = [];

  async getSayingList () {
    try {
      let response = await Axios.get<string[]>(`/api/saying/`);
      if (response.data) {
        this.sayingList = response.data;
      }
    } catch (error) {
      console.log("getSaying error:", error);
    }
  }

  async mounted () {
    await this.getSayingList();
  }
}
</script>


<style>
</style>
