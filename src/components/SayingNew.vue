<template>
  <q-item multiline>
    <q-item-side>
      <q-item-tile avatar>
        <img src="statics/quasar-logo.png" alt>
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel>新的微文</q-item-tile>
      <q-input type="textarea" v-model="saying.content"></q-input>
    </q-item-main>
    <q-item-side right>
      <div class="row"><q-btn flat round dense icon="check" @click="submitSaying"></q-btn></div>
      <div class="row"><q-btn flat round dense icon="close" @click="cancelNewSaying"></q-btn></div>
    </q-item-side>
  </q-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Saying } from "../model/Saying";
import Axios from "axios";

@Component
export default class SayingNew extends Vue {
  saying: Saying = new Saying();

  async submitSaying () {
    try {
      let response = await Axios.post<Saying>("/api/saying/", this.saying);
      this.$emit("post-new-saying");
    } catch (error) {
      
    }
  }

  cancelNewSaying () {
    this.$emit("cancel-new-saying");
  }
}
</script>
