<template>
  <q-scroll-area class="flex-item-fill">
    <q-list separator>
      <q-toolbar inverted color="primary">
        <q-toolbar-title>HPDell的 {{ sayingList.length }} 篇微文</q-toolbar-title>
        <q-btn flat round icon="add" @click="newSaying = true" v-if="$store.state.userModule.canEdit"></q-btn>
      </q-toolbar>
      <my-saying-new v-if="newSaying" @post-new-saying="onPostNewSaying()" @cancel-new-saying="onCancelNewSaying()"></my-saying-new>
      <template v-if="sayingList.length > 0">
        <my-saying v-for="sayingID in sayingList" :key="sayingID" :id="sayingID" @saying-deleted="onSayingDeleted"></my-saying>
      </template>
    </q-list>
  </q-scroll-area>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import SayingComponent from './Saying.vue';
import Axios from 'axios';
import SayingNew from './SayingNew.vue';
import * as moment from "moment";

@Component({
  components: {
    "my-saying": SayingComponent,
    "my-saying-new": SayingNew
  }
})
export default class SayingListComponent extends Vue {
  sayingList: string[] = [];

  newSaying: boolean = false;

  async getSayingList () {
    try {
      let response = await Axios.get<string[]>(`/api/saying/`, {
        params: {
          t: moment().format("x")
        }
      });
      if (response.data) {
        this.sayingList = response.data;
      }
    } catch (error) {
      this.$q.notify({
        message: `获取微文列表失败`,
        type: "negative",
        position: "top"
      });
    }
  }

  onPostNewSaying () {
    this.newSaying = false;
    this.getSayingList();
  }

  onCancelNewSaying () {
    this.newSaying = false;
  }

  async onSayingDeleted () {
    await this.getSayingList();
  }

  async mounted () {
    await this.getSayingList();
  }
}
</script>


<style>
</style>
